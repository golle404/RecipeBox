'use strict'

module.exports = React.createClass({
	displayName: 'RecipeDetail',
	getInitialState: function(){
		return{
			nullRecipe: {
				instructions:"",
				ingredients:[],
				name:"",
				prepTime:"",
				category:"",
				img:""
			}
		};
	},
	render: function() {
		var style = "recipe-detail " + this.props.data.detailState;
		var recipe = this.state.nullRecipe;
		var id = -1;
		if(this.props.data.recipe){
			recipe = this.props.data.recipe;
			id = this.props.data.id;
		}
		
		var events = this.props.events;

		return (
			<div className={style}>
				<div className="detail-header">
					<div className="prep-time">{recipe.prepTime}</div>
					<h3 className="detail-title">{recipe.name}</h3>
					<div className="recipe-category">{recipe.category}</div>
				</div> 
				<div className="detail-body">
					<figure className="recipe-pic">
						<img src={recipe.img}/>
					</figure>
					<ul className="ingredient-list">
						{recipe.ingredients.map(function(ing, id){
						return (
						<li className="ingredient-item" key={id}>{ing}</li>
						)
						})}
						</ul>
					<p className="recipe-instructions">
						{recipe.instructions}
					</p>
				</div> 
				<div className="detail-footer">
					<div onClick={events.close} className="btn btn-close">
					Close
					</div>
					<div onClick={events.delete.bind(null, id)} className="btn btn-delete">
					Delete
					</div> 
					<div onClick={events.edit.bind(null, id)} className="btn btn-edit">
					Edit
					</div>
				</div> 
			</div>
		);
	}
});