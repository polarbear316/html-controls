(function(){
	Polymer({
		is: "input-ctrl",
		created:function(){},
		ready:function(){
			var label = this.$$("label"), input = this.$$("input"), button = this.$$("button"); 
			if(this.hasAttribute("label")){
				label.innerText = this.getAttribute("label");
			} else {
				label.remove();
			}
			if(this.hasAttribute("placeholder")){
				input.setAttribute("placeholder",this.getAttribute("placeholder"));
			}
			if(this.hasAttribute("name")){
				input.setAttribute("name",this.getAttribute("name"));
			}
			if(this.hasAttribute("value")){
				input.setAttribute("value",this.getAttribute("value"));
			}
			if(this.hasAttribute("btn")){
				button.innerText = this.getAttribute("btn");
			} else {
				button.remove();
			}
		},
		factoryImpl:function(val){
			this.value = val;
		},
		get value(){
			return this.$$("input").value;
		},
		set value(val){
			this.$$("input").value = val;
		}
	});
})();