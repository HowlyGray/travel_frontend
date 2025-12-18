import React from 'react';
import { render, screen } from '@testing-library/react';
import SurfaceCard from '../components/SurfaceCard';

describe('SurfaceCard Component', () => {
  test('renders without crashing', () => {
    render(<SurfaceCard>Test Content</SurfaceCard>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    render(
      <SurfaceCard>
        <div>Child Element</div>
      </SurfaceCard>
    );
    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });

  test('accepts elevation prop', () => {
    const { container } = render(<SurfaceCard elevation="lg">Content</SurfaceCard>);
    const paper = container.querySelector('[class*="MuiPaper"]');
    expect(paper).toBeInTheDocument();
  });

  test('accepts padding prop', () => {
    const { container } = render(<SurfaceCard padding="lg">Content</SurfaceCard>);
    const paper = container.querySelector('[class*="MuiPaper"]');
    expect(paper).toBeInTheDocument();
  });

  test('calls onClick when provided and clicked', () => {
    const mockOnClick = jest.fn();
    render(<SurfaceCard onClick={mockOnClick}>Clickable</SurfaceCard>);
    const paper = screen.getByText('Clickable').closest('[class*="MuiPaper"]');
    paper.click();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
