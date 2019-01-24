import { Frame } from 'tns-core-modules/ui/frame/frame';
import { Observable } from 'tns-core-modules/ui/page/page';

export class ViewModel extends Observable
{
    constructor()
    {
        super();
    }
    private mainFrame: Frame = null;
    public set MainFrame(f: Frame)
    {
        if (this.mainFrame !== null)
            this.mainFrame = f;
    }
    public get MainFrame(): Frame
    {
        return this.mainFrame;
    }

}
