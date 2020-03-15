# emails-input

## Links
[Demo page](https://kenta88.github.io/emails-input/docs/)

## Getting started
```javascript
<div id="emails-input"></div>
<script src="emails-input.js"></script>
<script>
window.onload = function () {
    // initialize the emails input passing the container id
    var emailInput1 = new EmailsInput("emails-input-1");
  };
</script>
```

## Api

### Add random emails
```javascript
addRandomEmails();
```

### Get an alert with current number of emails
```javascript
getEmailsCount
```

### Get array of current emails
```javascript
getEmails()
```

### Set a new array of emails
```javascript
replaceEmails(string[])
```

### Set a new array of emails
```javascript
replaceEmails(string[])
```

### Subscribe to onChange method
```javascript
onChange((string[]) => void)
```

## Development
#### install dependencies running
```javascript
  yarn
  
  or
  
  npm install
```

#### run local env
```javascript
  yarn start:dev
```

#### build production version and run it locally
```javascript
  yarn build:local
  
  start:build
```
