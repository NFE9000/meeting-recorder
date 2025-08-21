{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Italic;\f1\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red143\green144\blue150;\red255\green255\blue255;\red42\green44\blue51;
\red147\green0\blue147;\red50\green94\blue238;\red66\green147\blue62;\red167\green87\blue5;\red219\green63\blue57;
}
{\*\expandedcolortbl;;\cssrgb\c62745\c63137\c65490;\cssrgb\c100000\c100000\c100000;\cssrgb\c21961\c22745\c25882;
\cssrgb\c65098\c14902\c64314;\cssrgb\c25098\c47059\c94902;\cssrgb\c31373\c63137\c30980;\cssrgb\c71765\c41961\c392;\cssrgb\c89412\c33725\c28627;
}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\i\fs28 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 // ===== DATEI 2: api/notion.js =====
\f1\i0 \cf4 \strokec4 \

\f0\i \cf2 \strokec2 // (Speichere das als api/notion.js - das ist die Edge Function)
\f1\i0 \cf4 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf5 \strokec5 export\cf4 \strokec4  \cf5 \strokec5 default\cf4 \strokec4  \cf5 \strokec5 async\cf4 \strokec4  \cf5 \strokec5 function\cf4 \strokec4  \cf6 \strokec6 handler\cf4 \strokec4 (req, res) \{\
    
\f0\i \cf2 \strokec2 // CORS Headers f\'fcr Vercel
\f1\i0 \cf4 \strokec4 \
    res.\cf6 \strokec6 setHeader\cf4 \strokec4 (\cf7 \strokec7 'Access-Control-Allow-Origin'\cf4 \strokec4 , \cf7 \strokec7 '*'\cf4 \strokec4 );\
    res.\cf6 \strokec6 setHeader\cf4 \strokec4 (\cf7 \strokec7 'Access-Control-Allow-Methods'\cf4 \strokec4 , \cf7 \strokec7 'POST, OPTIONS'\cf4 \strokec4 );\
    res.\cf6 \strokec6 setHeader\cf4 \strokec4 (\cf7 \strokec7 'Access-Control-Allow-Headers'\cf4 \strokec4 , \cf7 \strokec7 'Content-Type'\cf4 \strokec4 );\
\
    \cf5 \strokec5 if\cf4 \strokec4  (req.method \cf6 \strokec6 ===\cf4 \strokec4  \cf7 \strokec7 'OPTIONS'\cf4 \strokec4 ) \{\
        \cf5 \strokec5 return\cf4 \strokec4  res.\cf6 \strokec6 status\cf4 \strokec4 (\cf8 \strokec8 200\cf4 \strokec4 ).\cf6 \strokec6 end\cf4 \strokec4 ();\
    \}\
\
    \cf5 \strokec5 if\cf4 \strokec4  (req.method \cf6 \strokec6 !==\cf4 \strokec4  \cf7 \strokec7 'POST'\cf4 \strokec4 ) \{\
        \cf5 \strokec5 return\cf4 \strokec4  res.\cf6 \strokec6 status\cf4 \strokec4 (\cf8 \strokec8 405\cf4 \strokec4 ).\cf6 \strokec6 json\cf4 \strokec4 (\{ \cf9 \strokec9 error\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'Method not allowed'\cf4 \strokec4  \});\
    \}\
\
    \cf5 \strokec5 try\cf4 \strokec4  \{\
        \cf5 \strokec5 const\cf4 \strokec4  \{ dbId, apiKey, title, content, status \} \cf6 \strokec6 =\cf4 \strokec4  req.body;\
\
        \cf5 \strokec5 const\cf4 \strokec4  notionData \cf6 \strokec6 =\cf4 \strokec4  \{\
            \cf9 \strokec9 parent\cf6 \strokec6 :\cf4 \strokec4  \{ \cf9 \strokec9 database_id\cf6 \strokec6 :\cf4 \strokec4  dbId \},\
            \cf9 \strokec9 properties\cf6 \strokec6 :\cf4 \strokec4  \{\
                \cf9 \strokec9 'Name'\cf6 \strokec6 :\cf4 \strokec4  \{\
                    \cf9 \strokec9 title\cf6 \strokec6 :\cf4 \strokec4  [\{ \cf9 \strokec9 text\cf6 \strokec6 :\cf4 \strokec4  \{ \cf9 \strokec9 content\cf6 \strokec6 :\cf4 \strokec4  title \} \}]\
                \},\
                \cf9 \strokec9 'Status'\cf6 \strokec6 :\cf4 \strokec4  \{\
                    \cf9 \strokec9 select\cf6 \strokec6 :\cf4 \strokec4  \{ \cf9 \strokec9 name\cf6 \strokec6 :\cf4 \strokec4  status \}\
                \}\
            \},\
            \cf9 \strokec9 children\cf6 \strokec6 :\cf4 \strokec4  [\
                \{\
                    \cf9 \strokec9 object\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'block'\cf4 \strokec4 ,\
                    \cf9 \strokec9 type\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'paragraph'\cf4 \strokec4 ,\
                    \cf9 \strokec9 paragraph\cf6 \strokec6 :\cf4 \strokec4  \{ \cf9 \strokec9 rich_text\cf6 \strokec6 :\cf4 \strokec4  [\{ \cf9 \strokec9 text\cf6 \strokec6 :\cf4 \strokec4  \{ \cf9 \strokec9 content\cf6 \strokec6 :\cf4 \strokec4  content \} \}] \}\
                \}\
            ]\
        \};\
\
        \cf5 \strokec5 const\cf4 \strokec4  notionResponse \cf6 \strokec6 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  \cf6 \strokec6 fetch\cf4 \strokec4 (\cf7 \strokec7 'https://api.notion.com/v1/pages'\cf4 \strokec4 , \{\
            \cf9 \strokec9 method\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'POST'\cf4 \strokec4 ,\
            \cf9 \strokec9 headers\cf6 \strokec6 :\cf4 \strokec4  \{\
                \cf9 \strokec9 'Authorization'\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 `Bearer \cf4 \strokec4 $\{apiKey\}\cf7 \strokec7 `\cf4 \strokec4 ,\
                \cf9 \strokec9 'Content-Type'\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'application/json'\cf4 \strokec4 ,\
                \cf9 \strokec9 'Notion-Version'\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 '2022-06-28'\cf4 \strokec4 \
            \},\
            \cf9 \strokec9 body\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 JSON\cf4 \strokec4 .\cf6 \strokec6 stringify\cf4 \strokec4 (notionData)\
        \});\
\
        \cf5 \strokec5 if\cf4 \strokec4  (\cf6 \strokec6 !\cf4 \strokec4 notionResponse.ok) \{\
            \cf5 \strokec5 const\cf4 \strokec4  errorText \cf6 \strokec6 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  notionResponse.\cf6 \strokec6 text\cf4 \strokec4 ();\
            \cf8 \strokec8 console\cf4 \strokec4 .\cf6 \strokec6 error\cf4 \strokec4 (\cf7 \strokec7 'Notion API Error:'\cf4 \strokec4 , errorText);\
            \cf5 \strokec5 return\cf4 \strokec4  res.\cf6 \strokec6 status\cf4 \strokec4 (notionResponse.status).\cf6 \strokec6 json\cf4 \strokec4 (\{ \
                \cf9 \strokec9 error\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'Notion API Error'\cf4 \strokec4 , \
                \cf9 \strokec9 details\cf6 \strokec6 :\cf4 \strokec4  errorText \
            \});\
        \}\
\
        \cf5 \strokec5 const\cf4 \strokec4  result \cf6 \strokec6 =\cf4 \strokec4  \cf5 \strokec5 await\cf4 \strokec4  notionResponse.\cf6 \strokec6 json\cf4 \strokec4 ();\
        \cf5 \strokec5 return\cf4 \strokec4  res.\cf6 \strokec6 status\cf4 \strokec4 (\cf8 \strokec8 200\cf4 \strokec4 ).\cf6 \strokec6 json\cf4 \strokec4 (\{ \cf9 \strokec9 success\cf6 \strokec6 :\cf4 \strokec4  \cf8 \strokec8 true\cf4 \strokec4 , result \});\
\
    \} \cf5 \strokec5 catch\cf4 \strokec4  (error) \{\
        \cf8 \strokec8 console\cf4 \strokec4 .\cf6 \strokec6 error\cf4 \strokec4 (\cf7 \strokec7 'Edge Function Error:'\cf4 \strokec4 , error);\
        \cf5 \strokec5 return\cf4 \strokec4  res.\cf6 \strokec6 status\cf4 \strokec4 (\cf8 \strokec8 500\cf4 \strokec4 ).\cf6 \strokec6 json\cf4 \strokec4 (\{ \
            \cf9 \strokec9 error\cf6 \strokec6 :\cf4 \strokec4  \cf7 \strokec7 'Server Error'\cf4 \strokec4 , \
            \cf9 \strokec9 details\cf6 \strokec6 :\cf4 \strokec4  error.message \
        \});\
    \}\
\}}