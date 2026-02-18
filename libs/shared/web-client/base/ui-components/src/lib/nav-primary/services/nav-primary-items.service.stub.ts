import { NavPrimaryItem } from '../abstract/NavPrimaryItem';
import { INavPrimaryItemsService } from './nav-primary-items.service.interface';

export class NavPrimaryItemsServiceStub implements INavPrimaryItemsService {
  public items: NavPrimaryItem[] = []
}
