import { Event } from '../../app/core/models/event/event';

export const EVENTS: Array<Event> = [
 { id: '21', category: 'red', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'L-Transformer operator interval', device: 'ATrafoguard', asset: 'axyz-7889', location: 'aHashlbach', report: true },
 { id: '12', category: 'yellow', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'DSI replacement (estimate in days to 1005)', device: 'BTrafoguard', asset: 'bxyz-7889', location: 'bhash', report: true },
 { id: '23', category: 'yellow', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'F-Transformer dehydrating breather fault', device: 'CTrafoguard', asset: 'cxyz-7889', location: 'csubstation', report: true },
 { id: '14', category: 'red', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'Ethene C2H4 gas concentration', device: 'DTrafoguard', asset: 'dxyz-7889', location: 'dHashlbach', report: true },
 { id: '34', category: 'grey', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'Digital Input 12', device: 'ETrafoguard', asset: 'exyz-7889', location: 'eHashlbach', report: false },
 { id: '142', category: 'grey', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'Tap positin display error', device: 'FTrafoguard', asset: 'fxyz-7889', location: 'fHashlbach', report: false },
 { id: '14i', category: 'red', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'Ethene C2H4 gas concentration', device: 'GTrafoguard', asset: 'gxyz-7889', location: 'gHashlbach', report: true },
 { id: '34h', category: 'grey', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'Digital Input 12', device: 'HTrafoguard', asset: 'hxyz-7889', location: 'hashlbach', report: false },
 { id: '142g', category: 'grey', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'Tap positin display error', device: 'ITrafoguard', asset: 'ixyz-7889', location: 'hashlbach', report: false }, 
 { id: '14f', category: 'red', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'Ethene C2H4 gas concentration', device: 'JTrafoguard', asset: 'jxyz-7889', location: 'hashlbach', report: true },
 { id: '34e', category: 'grey', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'Digital Input 12', device: 'Trafoguard', asset: 'kxyz-7889', location: 'hashlbach', report: false },
 { id: '142d', category: 'grey', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'Tap positin display error', device: 'Trafoguard', asset: 'xyz-7889', location: 'hashlbach', report: false }, 
 { id: '14c', category: 'red', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'Ethene C2H4 gas concentration', device: 'Trafoguard', asset: 'xyz-7889', location: 'hashlbach', report: true },
 { id: '34b', category: 'grey', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'Digital Input 12', device: 'Trafoguard', asset: 'xyz-7889', location: 'hashlbach', report: false },
 { id: '142a', category: 'grey', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'BTap positin display error', device: 'Trafoguard', asset: 'xyz-7889', location: 'hashlbach', report: false },
 { id: '1424', category: 'grey', component: 'On-load changer', description: 'The Buchholz relay', remedy: 'Establish the cause of gases', eventName: 'ATap positin display error', device: 'Trafoguard', asset: 'xyz-7889', location: 'hashlbach', report: false }, 
];

/**
 * The enum for event tabs.
 */
export enum EVENT_TABS {
  TABLE = 'table',
  CATEGORY = 'category'
}

/**
 * The enum for event table fields.
 */
export enum EVENT_TABLE_FIELDS {
  CATEGORY = 'category',
  EVENT_NAME = 'eventName',
  DEVICE = 'device',
  ASSET = 'asset',
  LOCATION = 'location',
  REPORT = 'report'
}
