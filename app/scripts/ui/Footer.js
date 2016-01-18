'use strict'

module.exports=React.createClass({
	displayName: 'Footer',
	getInitialState: function(){
		return({});
	},
	render: function(){
		return(
			<footer className="footer">
				<a href="https://twitter.com/gollactive" className="btn btn-social">
					<i className="fa fa-twitter"></i>
				</a>
      			<a href="https://www.facebook.com/borabora.bora.925" className="btn btn-social">
      				<i className="fa fa-facebook"></i>
  				</a>
      			<a href="http://codepen.io/golle404/" className="btn btn-social">
      				<i className="fa fa-codepen"></i>
  				</a>
      			<a href="https://github.com/golle404" className="btn btn-social">
      				<i className="fa fa-github"></i>
  				</a>
      			<a href="http://www.freecodecamp.com/golle404" className="btn btn-social">
      				<i className="fa fa-fire"></i>
  				</a>
			</footer>
		);
	}
})