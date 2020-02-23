# Container image that runs your code
FROM algolia/docsearch-scraper:latest

RUN pipenv install requests

# Copies your code file from your action repository to the filesystem path `/root` of the container
COPY entrypoint.sh /root/entrypoint.sh

# Code file to execute when the docker container starts up (`entrypoint.sh`)
ENTRYPOINT ["/root/entrypoint.sh"]
