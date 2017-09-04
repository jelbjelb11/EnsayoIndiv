var baseURL = "http://localhost:62270/api/"
$(document).ready(function(){

	var MasterDetail = new Vue({
		el: 'body',
		data:{
			lista:[],
			currentObject:{
				index:"",
				property1:"",
				property2:"",
				property3:"",
				property4:""
			},
			previousObject:{
				index:"",
				property1:"",
				property2:"",
				property3:"",
				property4:""
			},
			read: true,
			menuChoice: "Entradas",
		}, 
		computed:{
			disabledOnNoChange: function(){
				retorno = false;
				if(this.read){
					retorno = true;
				}
				else if(this.currentObject.property1 != "" || this.currentObject.property1.localeCompare(this.previousObject.property1) == 0){
					retorno = true;
				}
				else if(this.currentObject.property2 != "" || this.currentObject.property2.localeCompare(this.previousObject.property2) == 0){
					retorno = true;
				}
				else if(this.currentObject.property3 != "" || this.currentObject.property3.localeCompare(this.previousObject.property3) == 0){
					retorno = true;
				}
				return retorno;

			},
		},

		methods:{
			chooseMenu: function(menu){
				this.menuChoice = menu;
				this.read = this.read; // Esto es para que se recargue menuChoice. No se por que
				this.makeGetListRequest();
				this.read = true;
				this.currentObject.index = "";
				this.currentObject.property1 = "";
				this.currentObject.property2 = "";
				this.currentObject.property3 = "";
				this.currentObject.property4 = "";

			},
			makeGetListRequest: function(){
				$.ajax(url=baseURL + this.menuChoice,
					method="GET")
				.done(this.submitGetListValues)
			},
			submitGetListValues: function(datos){
				this.lista = datos;
			},
			makeGetRequest: function(id){
				$.ajax(url=baseURL + this.menuChoice + "/" + id,
					method="GET")
				.done(this.submitDetailValues)
			},
			anchorClass: function(anchor){
				let classproperty1 = "anchorMenu ";

				if(anchor == this.menuChoice){
					classproperty1 = classproperty1+ "anchorSelected";
				}
				else{
					classproperty1 = classproperty1 +	"anchorNotSelected";
				}
				return classproperty1;
			},
			submitDetailValues: function(datos){
				if(this.menuChoice == 'Entradas'){
				this.currentObject.index = datos.Id;
				this.currentObject.property1 = datos.Pelicula;
				this.currentObject.property2 = datos.Sala;
				this.currentObject.property3 = datos.Butaca;
			}
			else if(this.menuChoice == 'Peliculas'){
				this.currentObject.index = datos.Id;
				this.currentObject.property1 = datos.Titulo;
				this.currentObject.property2 = datos.Duracion;
				this.currentObject.property3 = datos.Idioma;
				this.currentObject.property4 = datos.tresD;
			}
			},
			buttonAccept: function(){
				if(this.currentObject.index==""){
					this.makePostRequest(this.currentObject);
				}
				else{
					this.makePutRequest(this.currentObject);

				}
			},
			makePutRequest: function(item){
				$.ajax({url:baseURL + this.menuChoice +"/" + item.index,
					method:"PUT",
					data: 	{Id: item.index,
						Pelicula: item.property1,
						Sala: item.property2,
						Butaca: item.property3}})	
				.done(this.makeGetListRequest)
				.fail(function(){
					alert("ELEMENTO NO ACTUALIZADO");
				})
			},
			makePostRequest: function(item){
				var datos;
				if(this.menuChoice == 'Entradas'){
					datos = {
				Pelicula: this.currentObject.property1,
				Sala: this.currentObject.property2,
				Butaca: this.currentObject.property3
			};
			}
			else if(this.menuChoice == 'Peliculas'){
				datos = {
				Titulo: this.currentObject.property1,
				Duracion: this.currentObject.property2,
				Idioma: this.currentObject.property3,
				tresD: this.currentObject.property4
			};
			}
				$.ajax({url:baseURL + this.menuChoice,
					method:"POST",
					data: datos})	
				.done(this.afterPostHandler)
				.fail(function(){
					alert("ELEMENTO NO CREADO");
				})
			},
			afterPostHandler: function(datos){
				this.makeGetListRequest();
				this.currentObject.index = datos.Id;
				this.previousObject.index = this.currentObject.index;
				this.previousObject.property1 = this.currentObject.property1;
				this.previousObject.property2 = this.currentObject.property2;
				this.previousObject.property3 = this.currentObject.property3;
				this.previousObject.property4 = this.currentObject.property4;
			},
			computedClass: function (index) {
				classArray = "master-div-row ";
				if (this.currentObject.index != "" && index == this.currentObject.index) {
					classArray = classArray + "selected";
				}            

				return classArray;
			},
			readDetail: function(index){
				this.makeGetRequest(index);
				this.read = true;
			},
			updateDetail: function(index){
				this.makeGetRequest(index);
				this.previousObject.index = this.currentObject.index;
				this.previousObject.property1 = this.currentObject.property1;
				this.previousObject.property2 = this.currentObject.property2;
				this.previousObject.property3 = this.currentObject.property3;
				this.previousObject.property4 = this.currentObject.property4;
				this.read = false;
			},
			newDetail: function(index){
				this.read= false;
				this.currentObject.index = "";
				this.currentObject.property1 = "";
				this.currentObject.property2 = "";
				this.currentObject.property3 = "";
				this.currentObject.property4 = "";
			},
			deleteItem: function(index){
				$.ajax({url: baseURL + this.menuChoice +"/" + index,
					method:"DELETE"})	
				.done(this.makeGetListRequest)
				.fail(function(){
					alert("ELEMENTO NO BORRADO");
				})
			},
			buttonClean: function(){
				this.currentObject.index = "";
				this.currentObject.property1 = "";
				this.currentObject.property2 = "";
				this.currentObject.property3 = "";
				this.currentObject.property4 = "";
			},
			buttonReset: function(){
				this.currentObject = this.previousObject;
			},


		},
		created(){
			this.makeGetListRequest();

		},




	})

})		