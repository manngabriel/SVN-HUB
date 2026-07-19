export default async (req, res) => {
  const { table, query, method = 'GET', body } = req.body;
  
  const SB_URL = process.env.SUPABASE_URL;
  const SB_KEY = process.env.SUPABASE_KEY;
  
  const endpoint = `${SB_URL}/rest/v1/${table}${query || ''}`;
  
  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        'apikey': SB_KEY,
        'Content-Type': 'application/json'
      },
      body: method !== 'GET' ? JSON.stringify(body) : undefined
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};