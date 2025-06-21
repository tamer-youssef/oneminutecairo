interface Contributor {
  contributorName: string;
  socialLink?: string;
}

export async function getContributors(): Promise<Contributor[]> {
  try {
    const response = await fetch('https://api.github.com/gists/65530167d3546e6303252e1234880a18');
    if (!response.ok) {
      throw new Error(`Failed to fetch contributors: ${response.status} ${response.statusText}`);
    }
    
    const gistData = await response.json();
    const contributorsContent = gistData.files['contributors.json'].content;
    
    const data = JSON.parse(contributorsContent);
    if (!Array.isArray(data)) {
      console.error('Expected array but got:', typeof data);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching contributors:', error);
    return [];
  }
} 