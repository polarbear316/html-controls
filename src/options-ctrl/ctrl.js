(function(){
	Polymer({
		is: "options-ctrl",
		created:function(){},
		ready:function(){
			var self = this,
				name = this.getAttribute("name");
				this.type = this.getAttribute("type") || "checkbox";
			var opts = this.$$(".options-container").querySelectorAll("options-item");
			[].forEach.call(opts,function(item){
				item.setAttribute("name",name);
				if(self.type=="checkbox" || self.type=="radio"){
					item.setAttribute("type",self.type);
				}
			});
		},
		factoryImpl:function(val){
			this.value = val;
		},
		get value(){
			var opts = this.$$(".options-container").querySelectorAll("options-item");
			var vals = [].reduce.call(opts,function(out,item){
				if(item.checked){
					 out.push(item.value);
				}
				return out;
			},[]);
			if(this.type=="radio"){
				return vals[0]; 
			} 
			return vals;
		},
		set value(options){
			var cont = this.$$(".options-container");
			cont.innerHTML = "";
			options.forEach(function(option){
				var item = new OptionItem(option);
				cont.appendChild(item);
			});
		}
	});
	
	var OptionItem = Polymer({
		is: "options-item",
		created:function(){},
		ready:function(){
			this.$$("input").id = this.getAttribute("name").replace(/[^a-zA-Z0-9]/g,"") + parseInt(Math.random()*1000,10);
			this.$$("label").setAttribute("for",this.$$("input").id);
			this.$$("input").setAttribute("type",this.getAttribute("type")||"checkbox");
			this.$$("input").setAttribute("value",this.getAttribute("value"));
			if(!this.hasAttribute("icon")){
				this.$$("img").remove();
			}
		}, 
		factoryImpl:function(opt){
			this.$$("input").id = opt.name.replace(/[^a-zA-Z0-9]/g,"") + parseInt(Math.random()*1000,10);
			this.$$("label").setAttribute("for",this.$$("input").id);
			this.$$("input").setAttribute("type",opt.type||"checkbox");
			this.$$("input").setAttribute("value",opt.value);
			this.$$("input").checked = opt.checked;
			if(!opt.icon){
				this.$$("img").remove();
			}
		},
		get value() {
			this.$$("input").value;
		},
		set value(val) {
			this.$$("input").setAttribute("value",val);
			this.$$("input").value = val;
		},
		get checked(){
			return this.$$("input").checked;
		},
		set checked(bool){
			this.$$("input").checked = !!bool;
		}
	});
})();