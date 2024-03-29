#!/bin/sh

usernames=(     "tmonroe"
                "bekim"
                "mschmidt"
                "epuculla"
                "janog"
                "dloza"
                "emiliano"
                "martiix"
                "maticlarke"
)

firstnames=(    "Steven"
                "Ben"
                "Mike"
                "Edith"
                "Jano"
                "Daiana"
                "Emiliano"
                "Martin"
                "Matias"
)

lastnames=( "lname"
            "lname"
            "lname"
            "lname"
            "lname"
            "lname"
            "lname"
            "lname"
            "lname"
            )

temp=~/curlResponse.log
output=~/idUser.txt

for i in ${!usernames[@]}; do
    curl -H "Content-Type: application/json" -d'{"user":{
    "username": "'${usernames[$i]}'",
    "email": "'${usernames[$i]}'@gmail.fake",
    "password": "arealpassword",
    "firstName": "'${firstnames[$i]}'",
    "middleName": "middleName",
    "lastName": "'${lastnames[$i]}'",
    "maidenName": "maidenName",
    "phone": 123456789,
    "rut": "1234567891",
    "cabildos": [],
    "files": "none",
    "followers": [],
    "following": [],
    "activityFeed": []
    }}' http://localhost:3000/users >> $temp 2>&1
done
grep -o ':".*"' $temp | sed 's/[:"]//g' >> $output
rm -f $temp
cat $output
