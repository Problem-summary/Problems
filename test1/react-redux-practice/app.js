import React, { Component, PropTypes} from 'react';
import { Provider, connect} from 'react-redux';
import { Button } from 'local-Antd';
import RoomSelect from 'components/ui-number-select/index.jsx';
import GuestSelect from 'components/ui-hotel-guest/index.jsx';
import NumberSelect from 'components/ui-number/index.jsx';
import Msg from 'components/ui-msg/index.jsx';
import BaseCss from 'local-BaseCss/dist/main.css';
// import UIDiningCity from "components/ui-dining-city/index.jsx";
import GlobleCss from 'components/globleCss/index.scss';
import IndexCss from './sass/index.scss';
class App extends Component {
    render() {
    return (
        <div></div>
)
}
}


function mapStateToProps(state) {

    return todos:state.todos

}

/*
* function mapDispatchToProps(dispatch){
*     return {
*
*         actions:bindActionCreators(TodoActions,dispatch)
*     }
*
* }
* */

export default connect(mapStateToProps)(App)


/*
* export default connect(mapStateToProps,mapDispatchToProps)(App)
*
* */