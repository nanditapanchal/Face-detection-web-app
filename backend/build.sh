#!/bin/bash

# Update packages
apt-get update

# Install OpenCV build dependencies
apt-get install -y build-essential cmake pkg-config libgtk-3-dev \
  libavcodec-dev libavformat-dev libswscale-dev libtbb2 libtbb-dev \
  libjpeg-dev libpng-dev libtiff-dev protobuf-compiler libprotobuf-dev
