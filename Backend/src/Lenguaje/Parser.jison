
//------------------------------------------------------ANALIZADOR LEXICO------------------------------------------------------

%{
    //JAVASCRIPT
    


%}

%lex

UNUSED      [\s\r\t]+
INTEGER     [0-9]+\b
DOUBLE      [0-9]+\.[0-9]+\b
ID          [a-zA-Z_][a-zA-Z0-9_]*
STRING      \"([^\"\\]|\\.)*\"
CHAR        \'([^\\']|\\.)\'

%%

\n                  {}
{UNUSED}            {}

"entero"            {return 'TK_entero'}
"decimal"           {return 'TK_decimal'}
"cadena"            {return 'TK_cadena'}
"caracter"          {return 'TK_caracter'}
"booleano"          {return 'TK_booleano'}
"Verdadero"         {return 'TK_verdadero'}
"False"             {return 'TK_falso'}

"con"               {return 'TK_con'}
"valor"             {return 'TK_valor'}
"imprimir"          {return 'TK_imprimir'}
"si"                {return 'TK_if'}
"o"                 {return 'TK_else'}
"para"              {return 'TK_para'}
"funcion"           {return 'TK_funcion'}
"procedimiento"     {return 'TK_procedimiento'}
"retornar"          {return 'TK_retornar'}
"ejecutar"          {return 'TK_ejecutar'}

{ID}                {return 'TK_id'}
{STRING}            {return 'TK_string'}
{CHAR}              {return 'TK_char'}
{DOUBLE}            {return 'TK_double'}
{INTEGER}           {return 'TK_int'}

'+'                 {return 'TK_mas'}
'%'                 {return 'TK_modulo'}
'-'                 {return 'TK_menos'}
'*'                 {return 'TK_multiplicacion'}
'/'                 {return 'TK_division'}
'^'                 {return 'TK_potencia'}
'=='                {return 'TK_igualdad'}
'!='                {return 'TK_distinto'}
'='                 {return 'TK_asignacion'}
'>='                {return 'TK_mayorIgual'}
'<='                {return 'TK_menorIgual'}
'>'                 {return 'TK_mayor'}
'<'                 {return 'TK_menor'}
'&&'                {return 'TK_and'}
'||'                {return 'TK_or'}
'!'                 {return 'TK_not'}
'('                 {return 'TK_parAbre'}
')'                 {return 'TK_parCierra'}
'{'                 {return 'TK_llaveAbre'}
'}'                 {return 'TK_llaveCierra'}
';'                 {return 'TK_puntoComa'}

.                   {}
<<EOF>>             {return 'EOF'}



/lex

//------------------------------------------------------ANALIZADOR SINTACTICO------------------------------------------------------
%{
    //Javascript
%}


//Gramatica
%start INICIO

%%

INICIO
    :    ;

%%

