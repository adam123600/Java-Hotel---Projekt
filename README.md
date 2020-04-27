# System do zarządzania hotelem

Doinstalowanie:
Możliwe, ze nie wszystko się pobierze automatycznie. Wykryte problemy:
lombok -  doinstalować w intellij File->Settings->Plugins i tam w marketplace wyszukać lombok

Baza danych:
Używany jest MySQL
Należy utowrzyć sobie baze danych o nazwie hoteldb
W ustawienich ustawić serverTimezone jako UTC
w pliku src/main/resources/application.properties znajdują sie informacje.
Logujemy się jako root, proszę wpisać takie jakie macie własne ustawione.

DODANIE ADMINA:
W bazie danych dodajemy role (to tak poczatkowo tylko):

INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

Jeszcze nie ma zrobione, aby admin byl automatycznie dodawany do bazy, 
dlatego nalezy to zrobić osobiście. Jest to tak zrobione jak pod koniec
tego kursu: https://bezkoder.com/spring-boot-jwt-authentication/

Musimy posiadac aplikcję, ktora wysyła nam zapytania REST
 ( na google chrome program Advenced Rest Controller) i wysyłamy rejestracje admina
 jak na zdjęciu: 
 ![](./dodanie_admina.PNG) 
 
 W bazie powinien być już admin dzięk któremu się logujemy

Uruchamianie:
- Aby udostępnić API, należy uruchomić HotelApplication, na localhost:8080

- w katalogu src/main/java/frontend poprzez node.js wpisać komendę: npm start
Uruchomi się nam localhost:3000, na którym będą pokazywać się zmiany robione w aplikacji React

Budowanie pliku jar:
- należy w katalogu src/main/java/frontend poprzez node.js wpisać komendę: npm run build
- następnie wykonać clean i package na projekcie maven.
- po tych operacjach możemy uruchomić poołączony back i front na localhost:8080 
java -jar <ściażeka do pliku jar>
