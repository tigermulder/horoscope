import { selector } from 'recoil';
import { dateState } from './atom';

export const isDateEnteredSelector = selector({
  key: 'isDateEntered',
  get: ({get}) => {
    const date = get(dateState);
    return date.split('/').length === 3 && date.match(/^\d{4}\/\d{2}\/\d{2}$/);
  },
});
