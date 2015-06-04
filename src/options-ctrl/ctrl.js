(function(){
	Polymer({
		is: "options-ctrl",
		created:function(){},
		ready:function(){
			var name = this.getAttribute("name");
			var opts = this.$$(".options-container").querySelectorAll("options-item");
			[].forEach.call(opts,function(item){
				item.setAttribute("name",name);
			});
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
	Polymer({
		is: "options-item",
		created:function(){},
		ready:function(){
			this.$$("input").id = this.getAttribute("name").replace(/[^a-zA-Z0-9]/g,"") + parseInt(Math.random()*1000,10);
			this.$$("label").setAttribute("for",this.$$("input").id);
			
			if(!this.hasAttribute("icon")){
				this.$$("img").remove();
			}
		},
		factoryImpl:function(val){
			this.value = val;
		},
		get checked(){
			return this.$$("input").checked;
		},
		set checked(bool){
			this.$$("input").checked = !!bool;
		}
	});
})();