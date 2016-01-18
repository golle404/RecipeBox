
var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    RecipeBlock = require("./ui/RecipeBlock.js"),
    RecipeDetail = require("./ui/RecipeDetail.js"),
    RecipeForm = require("./ui/RecipeForm.js"),
    ModalOverlay = require("./ui/ModalOverlay.js"),
    Footer = require("./ui/Footer.js"),
    InitData = require("./data/initData"),
    mountNode = document.getElementById("app");

function getInitData(){
  if(localStorage.recipeBox){
    return JSON.parse(localStorage.recipeBox);
  }
  return InitData; 
}

var App = React.createClass({
  getInitialState: function() {
    return {
      recipes: this.props.data,
      modalData: {
        detailState: "",
        formState: "",
        id: null,
        recipe: null
      },
      detailEvents: {
        close: this.hideDetail,
        edit: this.showForm,
        delete: this.deleteRecipe
      },
      formEvents: {
        cancel: this.showDetail,
        save: this.saveRecipe
      }
    };
  },
  componentDidUpdate: function(){
    localStorage.recipeBox = JSON.stringify(this.state.recipes);
  },
  showDetail: function(id){
    if(id === -1){
      this.hideDetail()
    }else{
      this.setState({
        modalData: {
          detailState: "active",
          formState: "",
          id: id,
          recipe: this.state.recipes[id]
        }
      });
    } 
  },
  showForm: function(id){
    console.log("edit", id)
    this.setState({
      modalData: {
        detailState: "",
        formState: "active",
        id: id,
        recipe: this.state.recipes[id]
      }
    });
  },
  hideDetail: function(){
    this.setState({
      modalData: {
        detailState: "",
        formState: "",
      }
    }); 
  },
  deleteRecipe: function(id){
    console.log("delete", id)
    var newRecipes = this.state.recipes;
    newRecipes.splice(id, 1);
    this.setState({recipes: newRecipes}, function(){
      this.hideDetail();
    }); 
  },
  newRecipe: function(){
    console.log("new")
    this.setState({
      modalData: {
        detailState: "",
        formState: "active",
        id: -1,
        recipe: null
      }
    });
  },
  saveRecipe: function(recipe, id){
    var newRecipes;
    // if id === -1 it is new recipe
    // add to state recipes
    if(id === -1){
      newRecipes = this.state.recipes.concat([recipe]);
      id = newRecipes.length-1;
    }else{
      // else it is edited recipe with index === id
      // replace it with recipe argument
      newRecipes = this.state.recipes
      newRecipes[id] = recipe;
    }
    this.setState({recipes: newRecipes},function(){
      this.showDetail(id);
    }); 
  },
  render: function() {
    return (
      <div className="main">
        <header className="header">
          <h1>RecipeBox</h1>
          <div className="btn new-btn" onClick={this.newRecipe}>New Recipe</div>
        </header> 
        <div className="recipes"> 
          {renderItems(this.state.recipes, this.showDetail)}
        </div>
        <Footer />
        {renderModal(this.state.modalData, this.state.detailEvents, this.state.formEvents)}
      </div>
    );
  }
});

function renderItems(recipes, callback){
  return recipes.map(function(recipe, id){
    return (
      <RecipeBlock key={id} className="recipe-item" callback={callback} recipe={recipe} id={id} /> 
    )
  })
};

function renderModal(data, detailEvents, formEvents){
  return(
    <div>
      <ModalOverlay data={data} events={detailEvents}/>
      <RecipeDetail data={data} events={detailEvents}/>
      <RecipeForm data={data} events={formEvents}/>
    </div>
  )
}

ReactDOM.render(<App data={getInitData()}/>, mountNode);