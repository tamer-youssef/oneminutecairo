interface Contributor {
  contributorName: string;
  socialLink?: string;
}

export async function getContributors(): Promise<Contributor[]> {
  try {
    const response = await fetch('https://gist.githubusercontent.com/tamer-youssef/65530167d3546e6303252e1234880a18/raw/8c8ec5f050987271fccf07092c23d0ecb758c71d/contributors.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch contributors: ${response.status} ${response.statusText}`);
    }
    
    const text = await response.text();
    
    // clean the response text
    const cleanedText = text
      .replace(/\\/g, '') // remove backslashes
      .replace(/\[/g, '[') // ensure proper array brackets
      .replace(/\]/g, ']')
      .replace(/,(\s*[}\]])/g, '$1'); // remove trailing commas
    
    const data = JSON.parse(cleanedText);
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