# ms-contact-support
This microservice recieves customer feedback messages from FEM and forwards 
them to Help Scout.

## Requirements
This is a standard Node.js service and has the following external dependencies
specified via environment variables:
* `ESB`: The uri to the Help.com ESB instance (e.g., `tcp://localhost:8900`).

## Details
This service is responsible for formatting messages from FEM for the Help
Scout API and forwarding them. It also sends a reply to FEM upon the
completion of the request.

### Conversations
Conversations are the base payload for this service, with optional tag and
attachment properties.

```json
{
  "email": "customer@example.com",
  "name": "Joey Customer",
  "subject": "Help!",
  "body": "I broke everything :(",
  "tags": ["Bug Fix"],
  "attachment": {...}
}
```

### Attachments
Attachments are accepted in Base-64 format. It also requires a file name
and can optionally accept a mime type, which defaults to 'text/plain'.

```json
{
  "fileName": "sample.txt",
  "data":     "ddGVzdA==...",
  "mimeType": "text/plain"
}
```

### Rate Limits
The API limits us to 200 calls every minutes. Currently there is no longer for 
queuing calls based on this limit, however; it is unlikely to be an issue until
post beta.
