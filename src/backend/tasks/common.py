import json
from tornado.httpclient import AsyncHTTPClient, HTTPRequest


async def notify_slack(message):
    client = AsyncHTTPClient()
    url = "https://hooks.slack.com/services/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"
    headers = {
        'Content-Type': 'application/json'
    }

    data = {
        "channel": "#currency",
        "icon_emoji": ":ghost:",
        "text": message,
    }

    request = HTTPRequest(url, method="POST", headers=headers, body=json.dumps(data))
    response = await client.fetch(request, raise_error=False)
    if response.error:
        print(response.error)
        return False
    else:
        print(response.body)
        return True
