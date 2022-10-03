import { expect, describe, it, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/vue';
import StackCard from './StackCard.vue';

describe('StackCard', () => {
  const makeSut = ({ isReady = true } = {}) =>
    render(StackCard, {
      props: {
        name: 'Test name',
        description: 'Test description',
        link: 'http://test.com',
        isReady
      }
    });

  afterEach(cleanup);
  it('should display stack informations properly', () => {
    const { queryByText } = makeSut();

    expect(queryByText('Test name')).toBeInTheDocument();
    expect(queryByText('Test description')).toBeInTheDocument();
  });

  // it('should display a link with correct href that opens in a new tab', () => {
  //   const { queryByText } = makeSut();

  //   const link = queryByText('Learn more');

  //   expect(link).toBeInTheDocument();
  //   expect(link.getAttribute('href')).toBe('http://test.com');
  //   expect(link.getAttribute('target')).toBe('_blank');
  // });

  // it('should not display the link if the StackCard is not ready', () => {
  //   const { queryByText } = makeSut({ isReady: false });

  //   expect(queryByText('Learn more')).not.toBeInTheDocument();
  //   expect(queryByText('Soon™')).toBeInTheDocument();
  // });
});
