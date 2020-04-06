#!/bin/sh
rm -f ~/idUser.txt
rm -f ~/idCabildo.txt
<<<<<<< HEAD
=======
rm -f ~/curlResponse.log
touch ~/curlResponse.log
>>>>>>> b598d3b819b516abe452e4e52b687f13dcffe356

sh ./create-users.sh
sh ./create-cabildos.sh
sh ./follow-users.sh
sh ./follow-cabildos.sh
<<<<<<< HEAD

rm -f ~/idUser.txt
rm -f ~/idCabildo.txt
=======
sh ./create-activities.sh

#rm -f ~/idUser.txt
#rm -f ~/idCabildo.txt
>>>>>>> b598d3b819b516abe452e4e52b687f13dcffe356
