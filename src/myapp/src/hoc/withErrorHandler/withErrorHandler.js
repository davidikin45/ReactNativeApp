import React, {Component} from 'react';
import {Alert} from 'react-native';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => req, error => {
                Alert.alert('Error', error.message);
                return Promise.reject(error);
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                Alert.alert('Error', error.message);
                return Promise.reject(error);
            });
        }

        componentWillUnmount(){
             axios.interceptors.request.eject(this.reqInterceptor);
             axios.interceptors.response.eject(this.resInterceptor);
        }

        render(){
            return (<WrappedComponent {...this.props} />);
        }
    }
}
 
export default withErrorHandler;