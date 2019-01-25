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
     * Notify changes for all properties into the array
     * @param props array with props to notify
     */
    protected npsc(props: string[]): void
    {
        for (const item of props)
        {
            this.notifyPropertyChange(item, this.get(item));
        }
    }
    /**
     * Notify changes for a property
     * @param props array with props to notify
     */
    protected npc(prop: string): void
    {
        this.notifyPropertyChange(prop, this.get(prop));
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
