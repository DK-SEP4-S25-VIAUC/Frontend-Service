# Frontend-Service
## Overview
The Frontend-Service repository is a monorepo that contains the frontend for the 4th semester project for the Software Engineering program at Via University College. The repo contains a web application build in React.

## Getting Started
### Working in devcontainer
#### Visual Studio Code [wsl2 / macOS / Linux]
1. Install the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension in Visual Studio Code.
2. Open the repository in Visual Studio Code.
3. Press `F1` and select `Remote-Containers: Reopen in Container`.
4. Choose the `devcontainer` option.
5. Wait for the container to build and start, you are automaticly connected to the container. (This may take a few minutes the first time you open the container as the node:22 and packages are installed)

**Note: If you are using WSL2, make sure to have the WSL2 backend installed and running. You can find instructions on how to do this [here](https://docs.microsoft.com/en-us/windows/wsl/install).* Docker needs to be running.

#### Pushing to GitHub from the devcontainer
* Make sure to have your SSH key added to your GitHub account or that you have succesfully authenticated on your host machine. To see how [link to option further down]

The container is mounted to the host machine, so you can use the host machine to push to github. Therefore you cannot use git inside the container.

#### Jetbrains IDE: Remote Development - Dev Containers [macOS / Windows / Linux]
1. Install the [Docker](https://www.jetbrains.com/help/idea/docker.html) plugin in your Jetbrains IDE.
2. Select Remote Development > Dev Containers > New Dev Container.
3. Select the From VCS Project option. Insert the URL of the repository. (Make sure to use the SSH URL)
4. Now as this is a monorepo, which is why you have to specify the path to the service you want to work on. "[SERVICE]/.devcontainer/devcontainer.json". 
5. You have to also specify the branch, yet you can change this from inside the container, the only thing you have to acknowledge is that the devcontainer.json and Dockerfile may be outdated if you are choosing a deprecated branch.
6. Click OK.
7. Wait for the container to build and start, you are automaticly connected to the container. (This may take a few minutes the first time you open the container as the node:22 and packages are installed)

#### Pushing to GitHub from the devcontainer
* Make sure to have your SSH key added to your GitHub account or that you have succesfully authenticated on your host machine. To see how [link to option further down]

Jetbrains IDE is not mounted to the host machine, so you have to use the terminal inside the container to push to github. Therefore you need to use git inside the container.

### Setting up SSH
#### Windows
1. Open PowerShell as Administrator and run the following command:
```bash
dir $env:USERPROFILE\.ssh
```
2. If you see a file named `id_rsa.pub`, you already have an SSH key. If not, run the following command to generate a new SSH key:
```bash
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
```
3. Press Enter to accept the default file location this is very important as this is included from git, and then enter a passphrase if you want to add an extra layer of security.
4. Add the SSH key to the ssh-agent by running the following command:
```bash
ssh-add $env:USERPROFILE\.ssh\id_rsa
```
5. Copy the SSH key to your clipboard by running the following command:
```bash
Get-Content $env:USERPROFILE\.ssh\id_rsa.pub | clip
```
6. Go to your GitHub account settings and navigate to SSH and GPG keys.
7. Click on "New SSH key" and paste the key into the "Key" field.
8. Give the key a title and click "Add SSH key".
9. Test the connection by running the following command:
```bash
ssh -T git@github.com
```
10. If you see a message saying "Hi [username]! You've successfully authenticated, but GitHub does not provide shell access.", you are good to go.
#### macOS [AI generated]
1. Open Terminal and run the following command:
```bash
ls -al ~/.ssh
```
2. If you see a file named `id_rsa.pub`, you already have an SSH key. If not, run the following command to generate a new SSH key:
```bash







