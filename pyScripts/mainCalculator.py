import sys
import json
from math import sqrt
################################################################################
### loads takes file/string thing and produces an object #######################
################################################################################
resultsData = json.loads(sys.argv[1])
resultObject = resultsData["main"]
predictionObject = json.loads(sys.argv[2])
eventRace = sys.argv[3]
userId = predictionObject[eventRace]["Name"]
################################################################################
driverChampionshipObject = {"Hamilton" : 0, "Bottas" : 0, "Vettel" : 0, "Leclerc" : 0, "Kubica" : 0, "Russell" : 0, "Perez" : 0, "Stroll" : 0, "Verstappen" : 0, "Gasly" : 0, "Kyvat" : 0, "Albon" : 0, "Giovinazzi" : 0, "Raikkonen" : 0, "Sainz" : 0, "Norris" : 0, "Hulkenberg" : 0, "Ricciardo" : 0, "Magnussen" : 0, "Grosjean" : 0 }
driverChampionshipObjectUser = {"Hamilton" : 0, "Bottas" : 0, "Vettel" : 0, "Leclerc" : 0, "Kubica" : 0, "Russell" : 0, "Perez" : 0, "Stroll" : 0, "Verstappen" : 0, "Gasly" : 0, "Kyvat" : 0, "Albon" : 0, "Giovinazzi" : 0, "Raikkonen" : 0, "Sainz" : 0, "Norris" : 0, "Hulkenberg" : 0, "Ricciardo" : 0, "Magnussen" : 0, "Grosjean" : 0 }
driverChampionshipObject2 = {"Hamilton" : 0, "Bottas" : 0, "Vettel" : 0, "Leclerc" : 0, "Kubica" : 0, "Russell" : 0, "Perez" : 0, "Stroll" : 0, "Verstappen" : 0, "Gasly" : 0, "Kyvat" : 0, "Albon" : 0, "Giovinazzi" : 0, "Raikkonen" : 0, "Sainz" : 0, "Norris" : 0, "Hulkenberg" : 0, "Ricciardo" : 0, "Magnussen" : 0, "Grosjean" : 0 }
driverChampionshipObjectUser2 = {"Hamilton" : 0, "Bottas" : 0, "Vettel" : 0, "Leclerc" : 0, "Kubica" : 0, "Russell" : 0, "Perez" : 0, "Stroll" : 0, "Verstappen" : 0, "Gasly" : 0, "Kyvat" : 0, "Albon" : 0, "Giovinazzi" : 0, "Raikkonen" : 0, "Sainz" : 0, "Norris" : 0, "Hulkenberg" : 0, "Ricciardo" : 0, "Magnussen" : 0, "Grosjean" : 0 }
driverList = ["Hamilton","Bottas", "Vettel", "Leclerc", "Kubica" , "Russell", "Perez", "Stroll", "Verstappen", "Gasly", "Kyvat", "Albon", "Giovinazzi", "Raikkonen", "Sainz", "Norris", "Hulkenberg", "Ricciardo", "Magnussen", "Grosjean"]
pointsObject = {"First" : 25, "Second":18, "Third":15, "Fourth":12, "Fifth":10, "Sixth":8, "Seventh":6, "Eighth":4, "Ninth":2,"Tenth":1,"FastestLap":1}
################################################################################
correctArray = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth","Tenth"]
oneOffArray = ["Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth","Tenth", "Eleventh"]
twoOffArray = ["Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth","Tenth", "Eleventh", "Twelth"]
threeOffArray = ["Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth","Tenth", "Eleventh", "Twelth", "Thirteenth"]
################################################################################
def scoreFunction(predict, results):
    positionObject ={}
    raceObject = {}
    raceEventScore = 0
    topTenScore = 0
    numberOfRaces = len(results)
    latestEventIndex = numberOfRaces - 1
    latestEvent = results[latestEventIndex]["Race"]
    podiumPoints = 0
    raceObject["Winner"] = False
    raceObject["Podium"] = False
    for i in range(0, 1):
        positionObject[correctArray[i]] = 0
        if predict[latestEvent][correctArray[i]] == results[latestEventIndex][correctArray[i]]:
            positionObject[correctArray[i]] = 8
            topTenScore +=8
            raceObject[latestEvent] = positionObject
            podiumPoints += 1
            raceObject["Winner"] = True
            raceEventScore += 8
    ##################################################################
    for i in range(1, 3):
        positionObject[correctArray[i]] = 0
        if predict[latestEvent][correctArray[i]] == results[latestEventIndex][correctArray[i]]:
            positionObject[correctArray[i]] = 8
            topTenScore +=8
            raceObject[latestEvent] = positionObject
            podiumPoints += 1
            if podiumPoints == 3:
                raceObject["Podium"] = True
                raceEventScore += 8
    ##################################################################
    for i in range(3, len(correctArray)):
        positionObject[correctArray[i]] = 0
        if predict[latestEvent][correctArray[i]] == results[latestEventIndex][correctArray[i]]:
            positionObject[correctArray[i]] = 8
            topTenScore +=8
            raceObject[latestEvent] = positionObject
    ##################################################################
    ##################################################################
    for i in range(0, len(correctArray)):
        if predict[latestEvent][correctArray[i]] == results[latestEventIndex][oneOffArray[i]]:
            positionObject[correctArray[i]] = 5
            topTenScore +=5
            raceObject[latestEvent] = positionObject
    for i in range(0, 9):
        if predict[latestEvent][correctArray[i+1]] == results[latestEventIndex][correctArray[i]]:
            positionObject[correctArray[i+1]] = 5
            topTenScore +=5
            raceObject[latestEvent] = positionObject
    ##################################################################
    ##################################################################
    for i in range(0, len(correctArray)):
        if predict[latestEvent][correctArray[i]] == results[latestEventIndex][twoOffArray[i]]:
            positionObject[correctArray[i]] = 3
            topTenScore +=3
            raceObject[latestEvent] = positionObject
    for i in range(0, 8):
        if predict[latestEvent][correctArray[i+2]] == results[latestEventIndex][correctArray[i]]:
            positionObject[correctArray[i+2]] = 3
            topTenScore +=3
            raceObject[latestEvent] = positionObject
    ##################################################################
    ##################################################################
    for i in range(0, len(correctArray)):
        if predict[latestEvent][correctArray[i]] == results[latestEventIndex][threeOffArray[i]]:
            positionObject[correctArray[i]] = 1
            topTenScore +=1
            raceObject[latestEvent] = positionObject
    for i in range(0, 7):
        if predict[latestEvent][correctArray[i+3]] == results[latestEventIndex][correctArray[i]]:
            positionObject[correctArray[i+3]] = 1
            topTenScore +=1
            raceObject[latestEvent] = positionObject
    ##################################################################
    if predict[latestEvent]["PoleD"] == results[latestEventIndex]["PoleD"]:
        positionObject["PoleD"] = 10
        raceEventScore += 10
        raceObject[latestEvent] = positionObject
    elif predict[latestEvent]["PoleD"] != results[latestEventIndex]["PoleD"]:
        positionObject["PoleD"] = 0
        raceObject[latestEvent] = positionObject
    ##################################################################
    if predict[latestEvent]["TeamDriver"] == results[latestEventIndex]["TeamDriver"]:
        positionObject["TeamDriver"] = 10
        raceEventScore += 10
        raceObject[latestEvent] = positionObject
    elif predict[latestEvent]["TeamDriver"] != results[latestEventIndex]["TeamDriver"]:
        positionObject["TeamDriver"] = 0
        raceObject[latestEvent] = positionObject
    ##################################################################
    if predict[latestEvent]["DriverDay"] == results[latestEventIndex]["DriverDay"]:
        positionObject["DriverDay"] = 9
        raceEventScore += 9
        raceObject[latestEvent] = positionObject
    elif predict[latestEvent]["DriverDay"] != results[latestEventIndex]["DriverDay"]:
        positionObject["DriverDay"] = 0
        raceObject[latestEvent] = positionObject
    ##################################################################
    if predict[latestEvent]["BestFirst"] == results[latestEventIndex]["BestFirst"]:
        positionObject["BestFirst"] = 8
        raceEventScore += 8
        raceObject[latestEvent] = positionObject
    elif predict[latestEvent]["BestFirst"] != results[latestEventIndex]["BestFirst"]:
        positionObject["BestFirst"] = 0
        raceObject[latestEvent] = positionObject
    ##################################################################
    if predict[latestEvent]["MostPG"] == results[latestEventIndex]["MostPG"]:
        positionObject["MostPG"] = 7
        raceEventScore += 7
        raceObject[latestEvent] = positionObject
    elif predict[latestEvent]["MostPG"] != results[latestEventIndex]["MostPG"]:
        positionObject["MostPG"] = 0
        raceObject[latestEvent] = positionObject
    ##################################################################
    if predict[latestEvent]["FastestLap"] == results[latestEventIndex]["FastestLap"]:
        positionObject["FastestLap"] = 7
        raceEventScore += 7
        raceObject[latestEvent] = positionObject
    elif predict[latestEvent]["FastestLap"] != results[latestEventIndex]["FastestLap"]:
        positionObject["FastestLap"] = 0
        raceObject[latestEvent] = positionObject
    ##################################################################
    poleTimePred = str(predict[latestEvent]["PoleT"])
    poleTimeRes = str(results[latestEventIndex]["PoleT"])
    poleTimePredM = poleTimePred[1:2]
    poleTimePredSs = poleTimePred[3:5]
    poleTimePredSss = poleTimePred[6:9]
    if poleTimePredM.isdigit() and poleTimePredSs.isdigit() and poleTimePredSss.isdigit():
        poleTimePredM = int(poleTimePred[1:2])
        poleTimePredSs = int(poleTimePred[3:5])
        poleTimePredSss = int(poleTimePred[6:9])
        poleTimeResM = int(poleTimeRes[1:2])
        poleTimeResSs = int(poleTimeRes[3:5])
        poleTimeResSss = int(poleTimeRes[6:9])
        totalPred = poleTimePredSss + (poleTimePredSs * 1000) + (poleTimePredM * 60 * 1000)
        totalRes = poleTimeResSss + (poleTimeResSs * 1000) + (poleTimeResM * 60 * 1000)
        if totalPred == totalRes:
            positionObject["PoleT"] = 30
            raceEventScore += 30
            raceObject[latestEvent] = positionObject
        elif abs(totalPred - totalRes) < 201:
            positionObject["PoleT"] = 20
            raceEventScore += 20
            raceObject[latestEvent] = positionObject
        elif abs(totalPred - totalRes) < 501:
            positionObject["PoleT"] = 10
            raceEventScore += 10
            raceObject[latestEvent] = positionObject
        elif abs(totalPred - totalRes) > 501:
            positionObject["PoleT"] = 0
            raceObject[latestEvent] = positionObject
    else:
        positionObject["PoleT"] = 0
        raceObject[latestEvent] = positionObject
    raceObject["RE"] = raceEventScore
    raceObject["TT"] = topTenScore
    total = json.dumps(raceObject)
    return total
################################################################################
################################################################################
def scoreWholeFunction(predict, results):
    totalSummedScore = 0
    numberOfRaces = len(results)
    latestEventIndex = numberOfRaces - 1
    podiumPoints = 0
    racesArray = []
    for i in range(0, numberOfRaces):
        racesArray.append(results[i]["Race"])
    for k in range(0, len(racesArray)):
        latestEvent = results[k]["Race"]
        for i in range(0, 1):
            if predict[latestEvent][correctArray[i]] == results[k][correctArray[i]]:
                totalSummedScore +=16
                podiumPoints += 1
        ##################################################################
        for i in range(1, 3):
            if predict[latestEvent][correctArray[i]] == results[k][correctArray[i]]:
                totalSummedScore +=8
                podiumPoints += 1
                if podiumPoints == 3:
                    totalSummedScore += 8
        ##################################################################
        for i in range(3, len(correctArray)):
            if predict[latestEvent][correctArray[i]] == results[k][correctArray[i]]:
                totalSummedScore +=8
        ##################################################################
        ##################################################################
        for i in range(0, len(correctArray)):
            if predict[latestEvent][correctArray[i]] == results[k][oneOffArray[i]]:
                totalSummedScore +=5
        for i in range(0, 9):
            if predict[latestEvent][correctArray[i+1]] == results[k][correctArray[i]]:
                totalSummedScore +=5
        ##################################################################
        ##################################################################
        for i in range(0, len(correctArray)):
            if predict[latestEvent][correctArray[i]] == results[k][twoOffArray[i]]:
                totalSummedScore +=3
        for i in range(0, 8):
            if predict[latestEvent][correctArray[i+2]] == results[k][correctArray[i]]:
                totalSummedScore +=3
        ##################################################################
        ##################################################################
        for i in range(0, len(correctArray)):
            if predict[latestEvent][correctArray[i]] == results[k][threeOffArray[i]]:
                totalSummedScore +=1
        for i in range(0, 7):
            if predict[latestEvent][correctArray[i+3]] == results[k][correctArray[i]]:
                totalSummedScore +=1
        ##################################################################
        ##################################################################
        if predict[latestEvent]["PoleD"] == results[k]["PoleD"]:
            totalSummedScore += 10
        ##################################################################
        if predict[latestEvent]["TeamDriver"] == results[k]["TeamDriver"]:
            totalSummedScore += 10
        ##################################################################
        if predict[latestEvent]["DriverDay"] == results[k]["DriverDay"]:
            totalSummedScore += 9
        ##################################################################
        if predict[latestEvent]["BestFirst"] == results[k]["BestFirst"]:
            totalSummedScore += 8
        ##################################################################
        if predict[latestEvent]["MostPG"] == results[k]["MostPG"]:
            totalSummedScore += 7
        ##################################################################
        if predict[latestEvent]["FastestLap"] == results[k]["FastestLap"]:
            totalSummedScore += 7
        ##################################################################
        poleTimePred = str(predict[latestEvent]["PoleT"])
        poleTimeRes = str(results[k]["PoleT"])
        #print(type(poleTimeRes))str.isdigit()
        poleTimePredM = poleTimePred[1:2]
        poleTimePredSs = poleTimePred[3:5]
        poleTimePredSss = poleTimePred[6:9]
        if poleTimePredM.isdigit() and poleTimePredSs.isdigit() and poleTimePredSss.isdigit():
            poleTimePredM = int(poleTimePred[1:2])
            poleTimePredSs = int(poleTimePred[3:5])
            poleTimePredSss = int(poleTimePred[6:9])
            poleTimeResM = int(poleTimeRes[1:2])
            poleTimeResSs = int(poleTimeRes[3:5])
            poleTimeResSss = int(poleTimeRes[6:9])
            totalPred = poleTimePredSss + (poleTimePredSs * 1000) + (poleTimePredM * 60 * 1000)
            totalRes = poleTimeResSss + (poleTimeResSs * 1000) + (poleTimeResM * 60 * 1000)
            if totalPred == totalRes:
                totalSummedScore += 30
            elif abs(totalPred - totalRes) < 201:
                totalSummedScore += 20
            elif abs(totalPred - totalRes) < 501:
                totalSummedScore += 10
    return totalSummedScore
################################################################################
################################################################################
def championshipVariance(prediction, results, currentRace):
    numberOfRaces = len(results)
    wholeResult = {}
    totalVariance = 0
    S = 0
    while S < numberOfRaces:
        driverChampionshipObject2[results[S]["FastestLap"]] +=1
        driverChampionshipObjectUser2[prediction[results[S]["Race"]]["FastestLap"]] +=1
        for j in range(0, len(correctArray)):
            driverChampionshipObject2[results[S][correctArray[j]]] += pointsObject[correctArray[j]]
            driverChampionshipObjectUser2[prediction[results[S]["Race"]][correctArray[j]]] += pointsObject[correctArray[j]]
        S += 1
    for driver in driverList:
        pointDeltaInt = int(driverChampionshipObjectUser2[driver] - driverChampionshipObject2[driver])
        pointDelta = abs(pointDeltaInt)
        pointDeltaSq = (pointDelta) ** 2
        totalVariance += pointDeltaSq
    variance = -sqrt(totalVariance)
    roundedVariance = round(variance)
    wholeResult[currentRace] = roundedVariance
    wholeResultString = json.dumps(wholeResult)
    return wholeResultString
################################################################################
################################################################################
def championshipVarianceObjectData(prediction, results):
    numberOfRaces = len(results)
    wholeResult = {}
    latestEventIndex = numberOfRaces - 1
    VarianceList = []
    S = 0
    while S < numberOfRaces:
        driverChampionshipObject[results[S]["FastestLap"]] +=1
        driverChampionshipObjectUser[prediction[results[S]["Race"]]["FastestLap"]] +=1
        for j in range(0, len(correctArray)):
            driverChampionshipObject[results[S][correctArray[j]]] += pointsObject[correctArray[j]]
            driverChampionshipObjectUser[prediction[results[S]["Race"]][correctArray[j]]] += pointsObject[correctArray[j]]
        S += 1
    wholeResult["actual"] = driverChampionshipObject
    wholeResult[userId] = driverChampionshipObjectUser
    wholeResultString = json.dumps(wholeResult)
    return wholeResultString

################################################################################
################################################################################
wholeLoadOfData = {"champVarObjects" : championshipVarianceObjectData(predictionObject, resultObject),"totalSum" : scoreWholeFunction(predictionObject, resultObject), "USER" : userId, "RACE" : eventRace, "ChampVar" : championshipVariance(predictionObject, resultObject, eventRace), "SCORE" : scoreFunction(predictionObject, resultObject)}
print(json.dumps(wholeLoadOfData))
