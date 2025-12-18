import React from 'react';
import { render, screen } from '@testing-library/react';
import PostList from '../components/PostList';

const mockPosts = [
  {
    id: 1,
    title: 'Test Post',
    description: 'This is a test post',
    author: 'Test User',
    location: 'Test Location',
    category: 'Adventure',
    date: '2025-01-01',
    images: [{ id: 1, url: 'https://via.placeholder.com/400x300' }],
    likes: [],
    comments: [],
  },
];

describe('PostList Component', () => {
  test('renders without crashing', () => {
    render(<PostList posts={mockPosts} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  test('displays all posts', () => {
    render(<PostList posts={mockPosts} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
  });

  test('displays empty state when no posts', () => {
    render(<PostList posts={[]} />);
    expect(screen.getByText(/no posts found/i)).toBeInTheDocument();
  });

  test('renders multiple posts', () => {
    const multiplePosts = [
      ...mockPosts,
      {
        ...mockPosts[0],
        id: 2,
        title: 'Another Post',
      },
    ];
    render(<PostList posts={multiplePosts} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Another Post')).toBeInTheDocument();
  });
});
