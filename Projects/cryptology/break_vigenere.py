#!/usr/bin/env python
 # -*- coding: utf-8 -*-

import re
from ic import frequency_analisis
from vigenere import vigenere_dec
import time

def get_caesar(index, key, data):
    """"
    returns the caesar cipher that starts at the indexTh letter. Being key the key length
        get_caesar(1, 3, 'ABCABCABC') returns 'AAA'

        get_caesar(2, 3, 'ABCABCABC') returns 'BBB'

        get_caesar(3, 3, 'ABCABCABC') returns 'CCC'

        get_caesar(1, 5, 'ABCDEFGHI') returns 'AF' 
    """

    text = ""
    while index < len(data):
        text += data[index]
        index += key
    return text


def get_divisors(n):
    """
    returns the divisors for the given number
    """
    for i in range(2, int(n / 2) + 1):
        if n % i == 0:
            yield i
    yield n


def kasiski(data,sequence_len,max_key_len):
    """
    performs the kasiski analisis. Prints and returns a dictionary that contains the common factor of
    the distances and the number of times they appeared.

    inputs:
     data: the original data to analyse
     sequence_len: the size of the sequences to find
     max_key_len: the maxium size that the key could have (or -1 if no max size)
    """

    # list to store the distances
    seq_distances = []

    # iterate every possible position in the string where the sequence to find starts
    for index in range(0,len(data)-sequence_len):

        posible_seq = data[index:index + sequence_len] # get the sequence of the size given
        repetitions = data.count(posible_seq) # find repetions of such sequence

        # if a sequence is repeated, store the distances from each repetion
        if repetitions > 1:

            # use regex to find the indexs 
            indexs = re.finditer(pattern=posible_seq, string=data)
            indexs = [index.start() for index in indexs]
            # indexs is storing the indexs in the original data where each repetition starts
            # ex. indexs = [0,4,10] means that the 3 found repetitions of a given sequence starts at the positions 0,4 and 10

            # now that we have the index in the text for every repetition, we can calculate the distances
            for i in range(0,len(indexs)):
                for j in range(i,len(indexs)):
                    if i == j:
                        continue
                    seq_distances.append(indexs[j] - indexs[i])

    # after the loop, seq_distances has all the distances for all the sequences
    # Next step is getting the common factor of them
    distances = [*set(seq_distances)] # use set, to remove duplicate distances
    
    factor_count = {}
    for dis in distances:
        divisors = get_divisors(dis)
        for div in divisors:
            if max_key_len > 0:
                # if the divisor is higher than the maxium possible key, dont store it
                if div > max_key_len:
                    continue

            # keep the count of each divisor
            if div in factor_count:
                factor_count[div] += 1
            else:
                factor_count[div] = 1

    # now we print the highest counts
    print("=============\n")
    print("The factor count for the data is:")
    for factor in factor_count:
        print("Factor: " + str(factor) + " has a count of = " + str(factor_count[factor]))
    print("=============\n")

    return factor_count    

import string

def decrypt_vigenere(ciphertext, key_length):
    # Define the expected frequency of letters in the Swedish language
    expected_frequency = {'a': 0.1, 'b': 0.02, 'c': 0.03, 'd': 0.05, 'e': 0.12, 'f': 0.03, 'g': 0.02, 'h': 0.06, 'i': 0.06, 'j': 0.01, 'k': 0.03, 'l': 0.06, 'm': 0.04, 'n': 0.07, 'o': 0.06, 'p': 0.03, 'q': 0.01, 'r': 0.06, 's': 0.08, 't': 0.10, 'u': 0.03, 'v': 0.01, 'w': 0.02, 'x': 0.01, 'y': 0.02, 'z': 0.01}

    # Convert the ciphertext to lowercase
    ciphertext = ciphertext.lower()

    # Remove any non-alphabetic characters from the ciphertext
    ciphertext = "".join([char for char in ciphertext if char in string.ascii_lowercase])

    # Create a list to store the key
    key = [0] * key_length

    # Divide the ciphertext into columns based on the key length
    columns = [ciphertext[i::key_length] for i in range(key_length)]

    # Loop through each column and calculate the frequency of each letter
    for i, column in enumerate(columns):
        if column == "":
            continue
        frequency = {}
        for char in column:
            if char in frequency:
                frequency[char] += 1
            else:
                frequency[char] = 1

        # Find the letter with the highest frequency in the column

        most_common = max(frequency, key=frequency.get)

        # Calculate the shift required to turn the most common letter into the most common letter in the Swedish language
        shift = (ord(most_common) - ord('e')) % 26

        # Store the shift in the key list
        key[i] = shift

    # Use the key to decrypt the ciphertext
    plaintext = ""
    for i, char in enumerate(ciphertext):
        shift = key[i % key_length]
        plaintext += chr((ord(char) - shift + 26) % 26 + ord('a'))

    return plaintext

def hacker(abcd,data,max_key_len):
    """
    Performs the steps to break the vigenere cypher
    """

    for sequence_size in [3,4,5]:
        
        #try to find sequences of either 3,4 or 5 
        print("Now trying to find sequences of size: " + str(sequence_size))

        start = time.time()
        kasiski(data,sequence_size,max_key_len)
        end = time.time()
        print("\nKasiski took: " + str(end-start) + " seconds\n")

        #after printing the result of kasiski, ask the user which key to try to use
        possible_keys = input("\nWhich one of the displayed possible keys lengths would you like to use? \n" + 
                        "Separate them with comas\nEx: 2,8,10 \n:> ")


        possible_keys = possible_keys.split(",")
        for key in possible_keys:
            # trying with each length of key

            print("Trying with key of length: " + key)
            
            start = time.time()

            # we want to keep the individual caesar ciphers based on the length of the key
            caesar_ciphers = []
            for i in range(0,int(key)):
                caesar_ciphers.append(get_caesar(i,int(key),data))
            
            # try each letter to find the best score
            # frequency analysis to break each caesar

            vigenere_key = "" # keep storing the best letter of each Caesar here
            for caesar in caesar_ciphers:
                caesar_key = ""
                lowest_difference = 99999 # very high number, to start the algorithm
                
                for letter in abcd:
                    dec = vigenere_dec(abcd,letter,caesar) # decode the caesar with the given letter
                    score = frequency_analisis(abcd,dec) # score based on the frequency of the letters
                    if score <= lowest_difference: # if the score is the best so far, save the letter
                        lowest_difference = score # save the score as the best one
                        caesar_key = letter # save the letter, overwritting the previous best result
                
                vigenere_key += caesar_key #after the loop save the best letter for the solution of the vigenere

            end = time.time()
            print("\nFinding this solution took: " + str(end-start) + " seconds\n")

            print("Probable Key of length " + key + " := " + vigenere_key + "\n")
            print("The solved cypertext would be: \n")
            solution = vigenere_dec(abcd,vigenere_key,data)
            print(solution)
            
            # if the user thinks we are done, or they want to keep trying to break the cypher
            keep = input("\nContinue to do more operations? press Y to continue, else terminate  ")
            keep = keep.lower()
            if keep == 'y':
                continue
            else:
                return solution


if __name__ == "__main__":
    
    # ask the user for inputs

    alph = input("Write S for swedish alphabet, else for english : ")
    alph = alph.lower()
    abcd = "abcdefghijklmnopqrstuvwxyz"
    if alph == "s":
        abcd += "åäö"

    data = input("\nPlease enter the text to try to break: ")
    data = data.lower()
    data.replace(" ","")

    max_key_len = input("\nDo you know the maximum size of the key? Write the size or -1 if you don't know: ")
    max_key_len = int(max_key_len)

    print("\n")

    # call the hack function with the given arguments
    hacker(abcd,data,max_key_len)