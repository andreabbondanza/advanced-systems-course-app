import { Observable } from 'tns-core-modules/ui/page/page';
import TokenManager from './tokenManager';

export class ViewModel extends Observable
{
    constructor()
    {
        super();
        this.init();
    }
    /**
     * Notify changes for a property
     * @param props array with props to notify
     */
    protected npc(prop: string | string[]): void
    {
        if (typeof prop === "string")
            this.notifyPropertyChange(prop, this.get(prop));
        else
        {
            prop.forEach(item =>
            {
                this.notifyPropertyChange(item, this.get(item));
            });
        }
    }
    /**
     * Load token if exists
     */
    public init()
    {
        this.tManager.loadLocalToken();
    }
    /**
     * Generic viewmodel token manager
     */
    protected tManager: TokenManager = new TokenManager();
}
