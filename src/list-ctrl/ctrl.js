(function(){
	Polymer({
		is: "list-ctrl",
		created:function(){
			
		},
		ready:function(){
			var self = this;
			this.input 	= this.$$("input"),
			this.list 	= this.$$(".list-container");
				
			var valueAttr 		= this.getAttribute("value") || "";
				this.type 		= this.getAttribute("type") || "list",
				this.separator	= this.getAttribute("separator") || "|";
			
			//labelAttr 		? (label.innerText = labelAttr)						: label.remove();
			//placeholderAttr ? input.setAttribute("placeholder",placeholderAttr) : false;
			//btnAttr 		? (button.innerText = btnAttr)						: false;
			if(this.type == "pill"){
				this.input.size = 1;
				var inputSpan = document.createElement("span");
				inputSpan.classList.add("input-span");
				
				var text = document.createTextNode("");
				inputSpan.appendChild(text);
								
				inputSpan.appendChild(this.input);
				this.list.appendChild(inputSpan);
				this.replaceChild(this.list,this.$$(".list-input"));
			}
			this.value = valueAttr;	
			this.input.addEventListener("keyup",this.onInput.bind(this));
			this.input.addEventListener("keydown",this.onInput2.bind(this));
			this.input.addEventListener("blur",this.add.bind(this));
			
			this.list.addEventListener("click",function(e){
				if(e.target.classList.contains("close")){
					e.target.parentNode.remove();
					e.preventDefault();
					return;
				}
				if(self.type=="pill"){
					if(e.target.classList.contains("list-item")){
						console.log("Editing");
						self.edit(e);
					} else {
						self.input.focus();
					}
				}
			});
		},
		factoryImpl:function(val){
			//this.value = val;
		},
		onInput2:function(e){
			switch(e.keyCode){
				case 9:
					this.add();
				break;
			}
		},
		onInput:function(e){
			switch(e.keyCode){
				case 13:
					this.add();
				break;
				case 8:
					if(this.type == "pill" && this.input.previousSibling.textContent.length == 0){
						var prev = this.input.parentNode.previousSibling;
						if(prev) {
							prev.remove();
						}
					} else if(this.type == "pill") {
						var text = this.input.previousSibling;
						text.textContent = text.textContent.substr(0,text.textContent.length-1);
					}
				break;
				default:
					if(this.type == "pill"){
						this.input.previousSibling.textContent += this.input.value;
						this.input.value = "";
					}
				break;
			}
		},
		add:function(e){
			val = (typeof(e)=="string") ? e : (this.type=="pill" ? this.input.previousSibling.textContent : this.input.value);
			if(val.length){
				var item = document.createElement("span");
				item.classList.add("list-item");
				item.innerText = val;
				item.insertAdjacentHTML("beforeend",'<span class="close">&times;</span>');
				if(this.type == "pill"){
					this.list.insertBefore(item,this.input.parentNode);
				} else {
					this.list.appendChild(item);
				}
			}
			if(this.type == "pill"){
				this.input.previousSibling.textContent = "";
				this.list.appendChild(this.input.parentNode);
				if(!e || (e && e.type != "blur")){
					this.input.focus();
				}
			}
			this.input.value = "";
		},
		remove:function(){
			
		},
		edit:function(e){
			if(this.type == "pill"){
				var val = e.target.childNodes[0].textContent;
				this.list.replaceChild(this.input.parentNode,e.target);
				this.input.previousSibling.textContent = val;
				this.input.focus();
			}
		},
		get value(){
			var vals = [];
			[].forEach.call(this.list.querySelectorAll(".list-item"),function(item){
				vals.push(item.innerText);
			});
			return vals.join(this.separator);
		},
		set value(val){
			[].forEach.call(this.list.querySelectorAll(".list-item"),function(item){
				item.remove();
			});
			val.split(this.separator).forEach(this.add.bind(this));
		}
	});
})();