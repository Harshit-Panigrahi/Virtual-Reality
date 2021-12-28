AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" },
  },
  init: function () {
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
    this.handleMouseClickEvents();
  },
  handlePlacesListState: function () {
    const id = this.el.getAttribute("id");
    const placesId = ["taj-mahal", "budapest", "new-york", "eiffel-tower"];
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places_container");
      placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id,
      });
      this.el.setAttribute("geometry", { radiusOuter: 13.5 })
      this.el.setAttribute("material", {
        color: "forestgreen",
        opacity: 1,
      });
    }
  },
  handleMouseEnterEvents: function () {
    //Cursor 'mouseenter' Events
    this.el.addEventListener("mouseenter", () => {
      this.handlePlacesListState();
    });
  },
  handleMouseLeaveEvents: function () {
    this.el.addEventListener("mouseleave", () => {
      const { selectedItemId } = this.data;
      console.log(this.data.selectedItemId)
      if (selectedItemId) {
        const el = document.querySelector(`#${selectedItemId}`);
        const id = el.getAttribute("id");
        if (id == selectedItemId) {
          el.setAttribute("geometry", { radiusOuter: 13 })
          el.setAttribute("material", {
            color: "royalblue",
          });
        }
      }
    });
  },
  handleMouseClickEvents: function() {
    this.el.addEventListener("click", () => {
      console.log("Mouse has been clicked on a destination")
      const placesContainer = document.querySelector("#places_container")
      const { state } = placesContainer.getAttribute("tour")
      
      if (state == "placesList") {
        const id = this.el.getAttribute("id")
        const placesId = [ "taj-mahal", "budapest", "eiffel-tower", "new-york" ]
        if(placesId.includes(id)){
          placesContainer.setAttribute("tour", {
            state: "view",
            selectedCard: id,
          })
        }
      }
    })
  }
});