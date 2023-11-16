from setuptools import setup, find_packages

setup(
   name='se2150',
   version='1.0',
   description='A stupid cli',
   packages = ['res'],
   install_requires=[
        'attrs',
        'certifi==2021.10.8',
        'charset-normalizer==2.0.12',
        'check-wheel-contents==0.3.4',
        'click==8.0.3',
        'docopt==0.6.2',
        'idna==3.3',
        'mysql-connector-python==8.0.28',
        'numpy==1.22.2',
        'packaging==21.3',
        'pandas==1.4.1',
        'pipreqs==0.4.11',
        'protobuf==3.19.4',
        'pydantic==1.9.0',
        'pyparsing==3.0.7',
        'python-dateutil==2.8.2',
        'pytz==2021.3',
        'requests==2.27.1',
        'six==1.16.0',
        'tomli==2.0.1',
        'typer==0.4.0',
        'typing_extensions==4.1.1',
        'wheel-filename==1.4.0',
        'yarg==0.1.9'],
    entry_points={'console_scripts': ['se2150 = se2150:main']}

)
