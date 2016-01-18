'use strict'

module.exports=React.createClass({
	displayName: "ModalOverlay",
	getInitialState: function(){
		return({});
	},
	render: function(){
		var st = this.props.data.detailState + this.props.data.formState;
		var style = "modal-overlay " + st;
		return(
			<div className={style} onClick={this.props.events.close}/> 
		);
	}
})