import React, { Component } from 'react';
import { Button, Modal, FormGroup, ControlLabel,FormControl } from 'react-bootstrap';
import { createReview } from '../store';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';

class ProductReview extends React.Component {
  constructor(props) {
    super(props);
    const { product, user } = this.props;
    this.state = {
      description: '',
      title: '',
      rating: 0,
      errors: {},
      show: false,
      userId: user ? user.id : null,
      productId: product ? product.id : null
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validators = {

    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(ev){
    console.log('onChange',ev);
    var change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  };

  onSubmit(ev){
    console.log('onSubmot')
    ev.preventDefault();
    // const errors = Object.keys(this.validators).reduce( ( memo, key ) => {
    //   const validator = this.validators[key];
    //   const value = this.state[key];
    //   const error = validator( value );
    //   if( error ){
    //     memo[key] = error;
    //   }
    //   return memo;
    // }, {});
    // this.setState({ errors: errors });

    // if(Object.keys(errors).length > 0){
    //   return;
    // }

    console.log(`SAVING REVIEW`,this.state);
    this.props.createReview(this.state);
    this.setState({
      rating: 0,
      title: '',
      description: ''
    })
    this.handleClose();
  };

  getValidationState() {
    const length = this.state.title.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  onStarHover(nextValue, prevValue, name) {
    console.log(nextValue,prevValue,name)
    this.setState({rating: nextValue});
  };

  onStarHoverOut(nextValue, prevValue, name) {
    if(nextValue === 1 && prevValue === 1){
      this.setState({rating: 0});
    } else {
      this.setState({rating: nextValue});
    }
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  };

  render() {
    // const popover = (
    //   <Popover id="modal-popover" title="popover">
    //     very popover. such engagement
    //   </Popover>
    // );
    // const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
    const { handleChange, onSubmit } = this;
    const { rating } = this.state;
    return (
      <div>
        <Button bsStyle='primary' bsSize="medium" onClick={this.handleShow}>
          Write a review
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Review Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={onSubmit}>

          <FormGroup
            controlId="formBasicText">
              <ControlLabel>Headline</ControlLabel>
              <FormControl
                type="text"
                name='title'
                value={this.state.title}
                placeholder="Enter text"
                onChange={handleChange}
              />
            </FormGroup>

              <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Textarea</ControlLabel>
              <FormControl name='description' onChange={handleChange} componentClass="textarea" placeholder="textarea" />
            </FormGroup>
            <div style={{fontSize: 20}}>
              <StarRatingComponent
            name="rate2"
            editing={true}
            starCount={5}
            value={rating}
            onStarHover={this.onStarHover.bind(this)}
            onStarHoverOut={this.onStarHoverOut.bind(this)}
            onStarClick={this.onStarClick.bind(this)}
          />
          </div>
            <Button bsStyle="warning" type="submit">Submit</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createReview: (review) => dispatch(createReview(review, history))
  };
};

export default connect(null, mapDispatchToProps)(ProductReview);
