### Status of the project:
[![Actions Status](https://github.com/usergitvv/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/usergitvv/frontend-project-lvl2/actions)  [![Make_git-hub-checking_for_project2](https://github.com/usergitvv/frontend-project-lvl2/actions/workflows/git-hub-check.yml/badge.svg)](https://github.com/usergitvv/frontend-project-lvl2/actions/workflows/git-hub-check.yml)  [![Maintainability](https://api.codeclimate.com/v1/badges/9e23c8298b71cf6d96ea/maintainability)](https://codeclimate.com/github/usergitvv/frontend-project-lvl2/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/9e23c8298b71cf6d96ea/test_coverage)](https://codeclimate.com/github/usergitvv/frontend-project-lvl2/test_coverage)

#### Установка приложения:
1. Системные требования: операционная система семейства Linux или MacOS. Для установки в операционную систему Windows10 (и выше) необходимо предварительно установить в неё систему Linux согласно данной инструкции, после установки все дальнейшие действия проводите в терминале Linux [Установка WLS2 (Linux + Windows)](https://docs.microsoft.com/ru-ru/windows/wsl/install)
2. Убедитесь, что в вашей операционной системе установлен Node.js, если его нет, то установите текущую версию.
3. Склонируйте данный репозиторий на свой компьютер.
4. Откройте склонированную папку приложения в терминале и выполните команду ___npm ci___
5. Выполните команду ___make publish___
6. Выполните команду ___npm link___ (в случае ошибки необходимо использовать _sudo_ и ввести свой пароль для входа в систему ( _sudo npm link_ ))
Всё, приложение установлено. Оно позволяет сравнивать отличия двух файлов формата ```json``` или ```yaml (yml)```, причём оба сравниваемых файла должны быть с одинаковым форматом (например, _file1.yaml, file2.yml_ или _file1.json, file2.json_). Примеры работы приложения можно посмотреть в справочных видеороликах:

#### Пример работы пакета "Вычислитель отличий" (example of working the "Difference Calculator" package):
[![asciicast](https://asciinema.org/a/BKLPHoLVD56Gfms2A9CI22dsL.svg)](https://asciinema.org/a/BKLPHoLVD56Gfms2A9CI22dsL)

#### Пример работы пакета "Вычислитель отличий" - сравнение простых файлов (example of working the "Difference Calculator" package - comparison of simple files):
[![asciicast](https://asciinema.org/a/p1horwmqFBdYYfdIrnmY62vqc.svg)](https://asciinema.org/a/p1horwmqFBdYYfdIrnmY62vqc)

#### Пример работы пакета "Вычислитель отличий" - сравнение сложных файлов (example of working the "Difference Calculator" package - comparison of complex files):
[![asciicast](https://asciinema.org/a/ebRTpv1SFn8Vqn8tHlWCINmsw.svg)](https://asciinema.org/a/ebRTpv1SFn8Vqn8tHlWCINmsw)

#### Пример работы пакета "Вычислитель отличий" - сравнение сложных файлов через форматтер plain (example of working the "Difference Calculator" package - comparison of complex files by help of plain-formatter):
[![asciicast](https://asciinema.org/a/Ifj1M4sG7iLx12JVDekuaLE83.svg)](https://asciinema.org/a/Ifj1M4sG7iLx12JVDekuaLE83)

#### Пример работы пакета "Вычислитель отличий" - форматтер json, вывод структуры дерева (ast) (example of working the "Difference Calculator" package - formatter json, output of ast's structure):
[![asciicast](https://asciinema.org/a/V7CzO6luGxW9MJEwEGIfeDzdv.svg)](https://asciinema.org/a/V7CzO6luGxW9MJEwEGIfeDzdv)
