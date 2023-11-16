# se2150

CLI for Interoperability of Polls

## Contents
- Command Line interface

## Python3 packages

How to install

In CLI directory, do the following steps:

Step 1: Create a vitrual environment:
```sh
virtualenv {name}
```
Step 2: Activate environment
```sh
source {name}/bin/activate 
```
Step 3: Installation
```sh
pip install -e .   
```
To deactivate the virtual envirnoment
```sh
deactivate
```


## Usage
Run using se2150 and your scope and argumentes
```sh
se2150 SCOPE --format fff --param1 value1 [--param2 value2 ...]
```
To get a help message for each scope
```sh
se2150 SCOPE -h
```

## Testing
Inside the CLI directory
```sh
python3 test-passes.py
```

