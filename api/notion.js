export default async function handler(request) {
    // CORS Headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers });
    }

    if (request.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers }
        );
    }

    try {
        const { dbId, apiKey, title, content, status } = await request.json();

        const notionData = {
            parent: { database_id: dbId },
            properties: {
                'Name': {
                    title: [{ text: { content: title } }]
                },
                'Status': {
                    select: { name: status }
                }
            },
            children: [
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ text: { content: content } }] }
                }
            ]
        };

        const notionResponse = await fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify(notionData)
        });

        if (!notionResponse.ok) {
            const errorText = await notionResponse.text();
            return new Response(
                JSON.stringify({ error: 'Notion API Error', details: errorText }),
                { status: notionResponse.status, headers }
            );
        }

        const result = await notionResponse.json();
        return new Response(
            JSON.stringify({ success: true, result }),
            { status: 200, headers }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Server Error', details: error.message }),
            { status: 500, headers }
        );
    }
}
