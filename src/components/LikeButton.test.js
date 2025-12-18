import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LikeButton from '../components/LikeButton';

describe('LikeButton Component', () => {
  test('renders without crashing', () => {
    render(<LikeButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('toggles like state on click', () => {
    const { rerender } = render(<LikeButton liked={false} likeCount={0} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    // After click, it should be liked
    rerender(<LikeButton liked={true} likeCount={1} />);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  test('displays like count correctly', () => {
    render(<LikeButton likeCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('calls onLike callback when clicked', () => {
    const mockOnLike = jest.fn();
    render(<LikeButton onLike={mockOnLike} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnLike).toHaveBeenCalled();
  });

  test('has proper accessibility attributes', () => {
    render(<LikeButton />);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('aria-pressed');
  });
});
