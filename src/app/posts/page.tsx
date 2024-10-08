'use client'
import { useEffect, useState } from 'react'

type Post = {
  id: string
  title: string
  body: string
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/posts', { method: 'GET' })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: Post[] = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      console.log('Fetch done')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  )
}

export default Posts
