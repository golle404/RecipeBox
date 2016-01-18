'use strict'

module.exports = React.createClass({
	displayName: 'RecipeForm',
	getInitialState: function(){
		return {
			instructions: "",
			ingredients: [],
			name: "",
			prepTime: "",
			category: "",
			img: "",
			recipeId: -1,
			lastIngredient: ""
		};
	}, 
	componentWillReceiveProps: function(next){
		if(next.data.recipe){
		  this.setState({
		    instructions: next.data.recipe.instructions,
		    ingredients: next.data.recipe.ingredients,
		    name: next.data.recipe.name,
		    prepTime: next.data.recipe.prepTime,
		    category: next.data.recipe.category,
		    img: next.data.recipe.img,
		    recipeId: next.data.id
		  });
		}else{
		  this.setState(this.getInitialState());
		}
	}, 
	inputChange: function(e){
		if(e.target.name === "ingredients"){
			var li = e.target.value.split(",");
			if(li.length > 1){
				var newIngredients = this.state.ingredients.concat([li[0]]);
				this.setState({lastIngredient: li[1]});
				this.setState({ingredients: newIngredients});	
			}else{
				this.setState({lastIngredient: e.target.value});
			}
		}else{
			this.setState({[e.target.name]: e.target.value});
		}
  	}, 
	removeIngredient: function(id){
		var newIngredients = this.state.ingredients;
		newIngredients.splice(id, 1);
		this.setState({ingredients: newIngredients});
	},
	formSubmit: function(e){
		e.preventDefault();
		//clean ingridients input
		var newIngredients = this.state.ingredients.
			concat([this.state.lastIngredient]).
			map(function(ing){
				return ing.trim();
			}).
			filter(function(ing){
				return ing !== "";
			});
		this.setState({ingredients: newIngredients});
		var recipe= {
			instructions: this.state.instructions,
			ingredients: newIngredients,
			name: this.state.name,
			prepTime: this.state.prepTime,
			category: this.state.category,
			img: this.state.img
		}
		this.props.events.save(recipe, this.state.recipeId);
	}, 
	render: function(){
		var style = "recipe-form " + this.props.data.formState;
		var title = "New Recipe";
		if(this.props.data.recipe){
			title = "Edit Recipe"
		}
		var events = this.props.events;
		var removeIngredient = this.removeIngredient;
		return(
			<form className={style} onChange={this.inputChange} onSubmit={this.formSubmit}>
				<div className="detail-header">
					<div className="detail-title">{title}</div>
				</div>
				<div className="detail-body">
					<div className="input-group large">
						<label>recipe name</label>
						<input type="text" name="name" placeholder="Recipe Name" value={this.state.name} required/>
					</div>
					<div className="form-group">
						<div className="input-group">
							<label>category</label>
							<input type="text" name="category" placeholder="Category" value={this.state.category}/>
						</div>
						<div className="input-group">
							<label>preparation time</label>
							<input type="text" name="prepTime" placeholder="Preparation Time" value={this.state.prepTime}/>
						</div>
					</div>
					<div className="input-group">
						<label>image address</label>
						<input type="text" name="img" placeholder="Image URL" value={this.state.img}/>
					</div>
					<div className="form-group">
						<div className="input-group">
							<label>ingredients</label>
							<input name="ingredients" type="text" placeholder="Ingredients - coma separated values" value={this.state.lastIngredient}/>
							<ul className="ingredient-list">
								{this.state.ingredients.map(function(ing,id){
									ing = ing.trim();
									if(!ing) return;
									return(
										<li key={id}>
							  				<div className="btn ing-btn" onClick={removeIngredient.bind(null, id)}>
							    				{ing}
							  				</div>
										</li>
									)
							})}
							</ul>
						</div>
					</div>
					<div className="input-group">
						<label>instructions</label>
						<textarea name="instructions" placeholder="Instructions" value={this.state.instructions}/>
					</div> 
				</div>
				<div className="detail-footer">
					<input type="submit" className="btn btn-save" value="Save"/>
					<div onClick={events.cancel.bind(null, this.state.recipeId)} className="btn btn-cancel">
						Cancel
					</div>
				</div> 
			</form>
		) 
	}
})
