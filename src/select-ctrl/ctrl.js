(function(){
	Polymer({
		is: "select-ctrl",
		created:function(){},
		ready:function(){
			var self = this;
			this.select  = this.$$("select");
			this.combo  = this.$$(".combo-box");
			
			this.type = this.getAttribute("type") || "select";
			
			if(this.type == "select"){
				var opts = this.combo.querySelectorAll("option");
				[].forEach.call(opts,function(opt){
					self.select.appendChild(opt);
				});
				this.$$(".combo-box").remove();
			} else {
				this.select.remove();
				this.input = this.$$("input");
				this.input.addEventListener("input",this.filter.bind(this));
			}
		},
		factoryImpl:function(val){
			this.value = val;
		},
		filter:function(e){
			var val = e.target.value;
			console.log(val);
			var opts = this.combo.querySelectorAll("option");
			[].forEach.call(opts,function(opt){
				if(val.length && opt.textContent.toLowerCase().indexOf(val.toLowerCase()) == -1){
					opt.style.display = "none";
				} else {
					opt.style.display = "block";					
				}
			});
		},
		get value(){
			var selected = this.type == "combo" ? this.combo.querySelector("input") : this.select.querySelector("option[selected]");
			return selected ? selected.value : "";
		},
		set value(val){
			if(this.type == "combo"){
				this.combo.querySelector("input").value = val;
			} else {
				var opt = this.select.querySelector('option[value="'+val+'"]');
				if(opt){
					opt.selected = true;
				}
			}
		}
	});
})();