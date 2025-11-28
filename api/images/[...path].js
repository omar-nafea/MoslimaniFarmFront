// Vercel Serverless Function to proxy images from ngrok with required headers
export default async function handler(req, res) {
  const { path } = req.query;
  const imagePath = Array.isArray(path) ? path.join('/') : path;
  
  const backendUrl = process.env.VITE_API_URL?.replace('/api', '') || 'https://302ce27185c1.ngrok-free.app';
  const imageUrl = `${backendUrl}/images/${imagePath}`;
  
  try {
    const response = await fetch(imageUrl, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Image not found' });
    }
    
    const contentType = response.headers.get('content-type');
    const buffer = await response.arrayBuffer();
    
    res.setHeader('Content-Type', contentType || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    return res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Error fetching image:', error);
    return res.status(500).json({ error: 'Failed to fetch image' });
  }
}

