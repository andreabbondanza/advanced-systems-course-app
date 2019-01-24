/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, NavigatedData, Page } from "tns-core-modules/ui/page";

import { Button } from 'tns-core-modules/ui/button/button';
import { HomeViewModel } from "./home-view-model";

export function onNavigatingTo(args: NavigatedData)
{
    const page = args.object as Page;
    page.bindingContext = new HomeViewModel();
}