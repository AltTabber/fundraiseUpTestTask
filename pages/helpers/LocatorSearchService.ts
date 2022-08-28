import { Locator } from "@playwright/test";

export class LocatorSearchService{

    async getVisibleElementFromLocator(locatorWithMultipleElements: Locator): Promise<Locator>{
        const count = await locatorWithMultipleElements.count();
        let locator:Locator = locatorWithMultipleElements.last();
        let zIndex:number = Number.MIN_VALUE;

        for(let i=0; i<count; i++ ){

            

            // let currentZIndex:string = await locator.evaluate( (element) => {
            //     let getZIndexOfElement = function (e, prevZ) {
            //         let zIndex:string = document.defaultView.getComputedStyle(e).getPropertyValue('z-index');
            //         if(!e.parentElement){
            //             return prevZ;
            //         }
            //         if (zIndex == 'auto'){
            //             return getZIndexOfElement(e.parentElement, prevZ);
            //         } else{
            //             return getZIndexOfElement(e.parentElement, Number.parseInt(prevZ) + Number.parseInt(zIndex)); 
            //         } 
            //     }

            //     return getZIndexOfElement(element, 0);
            // });
        
            // console.log("currentZ " + currentZIndex + "  ");
            if(await locator.isVisible() ){
                // zIndex = Number.parseInt(currentZIndex);
                locator = locatorWithMultipleElements.nth(i);
            }
        }
        console.log("isVisible = " + await locator.isVisible() + "  " + await locator.innerText());
        return locator;
    }

    

}