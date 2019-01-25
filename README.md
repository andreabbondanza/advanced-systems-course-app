# NativeScript Example Application for Advanced System

## Requirements

- Visual Studio Code
- node.js
- npm
- nativescript CLI
- nativescript build stuff

you can find all the instructions [here](https://docs.nativescript.org/start/general-requirements#full-setup-requirements-windows)


## Start from 0

The instructions to create an App from 0 with the blank template:

```bash
tns create app-name --template tns-template-blank-ts
```
__NOTE:__ if the folder doesn't contains "node_modules" folder you must launch the:
```bash
npm install
```
command into the folder.

After that you must execute the follow command to generate the platform folder for android:

```bash
tns build android --bundle
```

Go into the __"platforms"__ folder and set the:
```ini
org.gradle.jvmargs=-Xmx512M
```
to prevent the Java Virtual Machine exception for excessive use of memory.

## Visual studio Code - Extensions and configurations

Install the following Visual Studio's extensions:
- _Auto Close Tag_ by __Jun Han__
- _Auto Rename Tag_ by __Jun Han__
- _GitLens - Git supercharged_ by __Eric Amodio__
- _JSON Tools_ by __Erik Lynd__
- _ignore "g" it_ by __Andrea Vincenzo Abbondanza__
- _NativeScript_ by __Telerik__
- _NativeScript XML Snippets_ by __Tsevetan Ganev__
- _npm Intellisense_ by __Christian Kohler__
- _Prettier-Standard - Javascript Formatter_ by __numso__
- _Setting Sync_ by __Shan Khan__ | __(facoltative)__
- _stack-tabs_ by __Kyle Paulsen__ | __(facoltative)__
- _Surround_ by __Mehmet Yatki__ | __(facoltative)__
- _TSLint_ by __egemma__

### Git

Before use git in VSCode, you must install it. Go [here](https://git-scm.com/downloads) to download it.

After installed, you don't have to do anything else.

__NB:__ When you clone something, if you're not registred to the service and you just want use git on your machine, you must set an username and an email to execute commits.

Here the commands to execute to set them:
```bash
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```
This will set the __GLOBAL__ user data in your system (so you can use it in every project). 

If you want scope the credentials locally, just execute commands without global:
```bash
$ git config user.name "John Doe"
$ git config user.email johndoe@example.com
```

### Default shell

In VSCODE when you press __F1__ button you'll open the prompt where you can execute commands.

One of this commands let you select your default shell (you can open pressing __ctrl+ò__).

Press __F1__ and write:

```bash
>Terminal: Select Default Shell
```

and select your favourite shell.

## LAST UPDATE FOR THE PROJECT

#### Generic ViewModel

All _viewmodels_ must extends __ViewModel__ class that contains utilities and the __TokenManager__ object.

#### Improvements for notifyPropertyChanges methods

Instead of the classic:
```typescript
this.notifyPropertyChanged("PropName", this.PropName);
```
now you can use a shorten syntax for multiple notification with:
```typescript
this.npc(["PropName", "PropName1", "PropName2"]);
```

#### RestClient throw HTTPError exceptions for non 2XX status code

```typescript
const client = new RestClient();
try
{
    const json = {
        email: this.Email,
        password: this.Password,
        remember: this.Remember
    };
    const req = await client.request(
        {
            headers: client.headers,
            url: "https://corso.dev.dewstudio.eu/api/login",
            method: "POST",
            content: JSON.stringify(json)
        }
    );
    const response = StandardResponse.jsonToStandardResponse<any>(req.content.toJSON());
    this.tManager.setToken(response.data.token);
    this.npc(["VisToken", "VisTokenInverse"]);
} catch (err)
{
    const error = err as HttpError;
    // is an httperror
    if (error !== null)
    {
        const response = StandardResponse.jsonToStandardResponse<any>(error.response.content.toJSON());
        await dialogs.alert(response.errorMessage);
    }
    else{
        // manage differently
    }
}
```
All the non 2XX response from server are managed like exception.

So, in the catch we check if the exception is of type _HttpError_ (__as__ operator return null if cast doesn't work). In this case, we manage the error via statuscode or errorMessage.

#### To Standard Response

Now we have the type _StandardResponse_ that is the standard response we get from server:
```json
{
    errorMessage: "string"
    data: "anything",
    error: {
        number: "number",
        desc: "string"
    }
}
```
We have also a static methods in __StandardResponse__ class that convert our data in generics T type:
```ts
    const client = new RestClient();
    const req = await client.request(/*options*/);
    const response = StandardResponse.jsonToStandardResponse<any>(req.content.toJSON());
    // any type, you can access to data in javascript style
    console.log(response.data.pippo);
    // or for example
    const response = StandardResponse.jsonToStandardResponse<User>(req.content.toJSON());
    // now you can access to data as User type object
    console.log(response.data.name); // exists
    console.log(response.data.burp); // error in complie time
```

## End

Good work guys