
document.querySelectorAll(".aboutUs_dflex").forEach(
    (item, index) => {
        item.addEventListener(
            "click",
            (event)=>{
                location.hash = `#personal-page/${index}`
            }
        )
    }
)