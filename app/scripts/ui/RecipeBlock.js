'use strict';

module.exports = React.createClass({
  render: function(){
    var recipe = this.props.recipe;
    var cb = this.props.callback;
    var id = this.props.id;

    return (
      <div key={id} className="recipe-item" onClick={cb.bind(null, id)}>
        <figure>
          <img className="recipe-img" src={recipe.img}/>
        </figure>
        <h2 className="recipe-name">{recipe.name}</h2>
        <div className="prep-time">{recipe.prepTime}</div>
        <div className="recipe-category">{recipe.category}</div>
      </div> 
    )
  }
})
