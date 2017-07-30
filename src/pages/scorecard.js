import React, { Component } from 'react';
//import PropTypes from 'prop-types';





export class Scorecard extends Component {
        

    componentWillMount() {}


    componentDidMount() {
        
       
    }

    componentWillReceiveProps(nextProps) {


    

    }

    shouldComponentUpdate(nextProps, nextState) {
        

        return true

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {

        

        return (
            <div>
                <h1>Scorecard for {this.props.courseName}  </h1>
            </div>
        );
    }
}

Scorecard.propTypes = {

};

export default Scorecard;